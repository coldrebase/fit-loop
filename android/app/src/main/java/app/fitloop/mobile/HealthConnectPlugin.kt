package app.fitloop.mobile

import android.content.Intent
import android.net.Uri
import androidx.activity.result.ActivityResult
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.Record
import androidx.health.connect.client.records.RestingHeartRateRecord
import androidx.health.connect.client.records.SleepSessionRecord
import androidx.health.connect.client.records.WeightRecord
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.ActivityCallback
import com.getcapacitor.annotation.CapacitorPlugin
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import java.time.Duration
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

/**
 * Health Connect 原生桥接（只读）
 * ---------------------------------------------------------------------------
 * 读取：体重 / 睡眠 / 静息心率，写进应用自己的存储，不回写健康数据。
 * Health Connect 客户端是 Kotlin 协程 API，所以本插件用 Kotlin 实现。
 */
@CapacitorPlugin(name = "HealthConnect")
class HealthConnectPlugin : Plugin() {

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    private val permissions: Set<String> = setOf(
        HealthPermission.getReadPermission(WeightRecord::class),
        HealthPermission.getReadPermission(SleepSessionRecord::class),
        HealthPermission.getReadPermission(RestingHeartRateRecord::class)
    )

    private fun client(): HealthConnectClient = HealthConnectClient.getOrCreate(context)

    private fun statusText(): String = when (HealthConnectClient.getSdkStatus(context)) {
        HealthConnectClient.SDK_AVAILABLE -> "available"
        HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED -> "update_required"
        else -> "unavailable"
    }


    @PluginMethod
    fun available(call: PluginCall) {
        val out = JSObject()
        out.put("status", statusText())
        call.resolve(out)
    }

    @PluginMethod
    fun checkHealthPermissions(call: PluginCall) {
        if (statusText() != "available") {
            val out = JSObject()
            out.put("granted", false)
            out.put("status", statusText())
            call.resolve(out)
            return
        }
        scope.launch {
            try {
                val granted = client().permissionController.getGrantedPermissions()
                val out = JSObject()
                out.put("granted", granted.containsAll(permissions))
                out.put("status", "available")
                call.resolve(out)
            } catch (e: Exception) {
                call.reject("读取权限状态失败: ${e.message}")
            }
        }
    }

    @PluginMethod
    fun requestHealthPermissions(call: PluginCall) {
        if (statusText() != "available") {
            val out = JSObject()
            out.put("granted", false)
            out.put("status", statusText())
            call.resolve(out)
            return
        }
        try {
            val contract = PermissionController.createRequestPermissionResultContract()
            val intent = contract.createIntent(context, permissions)
            startActivityForResult(call, intent, "permissionResult")
        } catch (e: Exception) {
            call.reject("拉起授权页失败: ${e.message}")
        }
    }

    @ActivityCallback
    fun permissionResult(call: PluginCall?, result: ActivityResult?) {
        if (call == null) return
        scope.launch {
            try {
                val granted = client().permissionController.getGrantedPermissions()
                val out = JSObject()
                out.put("granted", granted.containsAll(permissions))
                out.put("status", "available")
                call.resolve(out)
            } catch (e: Exception) {
                call.reject("授权结果读取失败: ${e.message}")
            }
        }
    }

    @PluginMethod
    fun openHealthConnect(call: PluginCall) {
        try {
            val intent = Intent("androidx.health.ACTION_HEALTH_CONNECT_SETTINGS")
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
            call.resolve()
        } catch (e: Exception) {
            try {
                val store = Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=com.google.android.apps.healthdata"))
                store.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(store)
                call.resolve()
            } catch (e2: Exception) {
                call.reject("无法打开 Health Connect: ${e2.message}")
            }
        }
    }

    @PluginMethod
    fun readData(call: PluginCall) {
        if (statusText() != "available") {
            call.reject("Health Connect 不可用（status=${statusText()}）")
            return
        }
        val days = (call.getInt("days") ?: 30).coerceIn(1, 365)

        scope.launch {
            try {
                val c = client()
                val granted = c.permissionController.getGrantedPermissions()
                if (!granted.containsAll(permissions)) {
                    call.reject("权限未授予")
                    return@launch
                }

                val zone = ZoneId.systemDefault()
                val end: Instant = Instant.now()
                val start: Instant = end.minusSeconds(days.toLong() * 24 * 3600)
                val filter = TimeRangeFilter.between(start, end)

                val weights = JSArray()
                c.readRecords(
                    ReadRecordsRequest(
                        recordType = WeightRecord::class,
                        timeRangeFilter = filter,
                        ascendingOrder = false,
                        pageSize = 5000
                    )
                ).records.forEach { r: Record ->
                    val w = r as WeightRecord
                    val o = JSObject()
                    o.put("date", LocalDate.ofInstant(w.time, zone).toString())
                    o.put("kg", Math.round(w.weight.inKilograms * 100.0) / 100.0)
                    weights.put(o)
                }

                val sleepByDate = HashMap<String, Double>()
                c.readRecords(
                    ReadRecordsRequest(
                        recordType = SleepSessionRecord::class,
                        timeRangeFilter = filter,
                        ascendingOrder = false,
                        pageSize = 5000
                    )
                ).records.forEach { r: Record ->
                    val s = r as SleepSessionRecord
                    val mins = Duration.between(s.startTime, s.endTime).toMinutes()
                    if (mins in 1..(24 * 60)) {
                        val date = LocalDate.ofInstant(s.endTime, zone).toString()
                        sleepByDate[date] = (sleepByDate[date] ?: 0.0) + mins / 60.0
                    }
                }
                val sleep = JSArray()
                sleepByDate.forEach { (date, hours) ->
                    val o = JSObject()
                    o.put("date", date)
                    o.put("hours", Math.round(hours * 10.0) / 10.0)
                    sleep.put(o)
                }

                val hr = HashMap<String, DoubleArray>()
                c.readRecords(
                    ReadRecordsRequest(
                        recordType = RestingHeartRateRecord::class,
                        timeRangeFilter = filter,
                        ascendingOrder = false,
                        pageSize = 5000
                    )
                ).records.forEach { r: Record ->
                    val h = r as RestingHeartRateRecord
                    val date = LocalDate.ofInstant(h.time, zone).toString()
                    val acc = hr[date] ?: doubleArrayOf(0.0, 0.0)
                    acc[0] += h.beatsPerMinute.toDouble()
                    acc[1] += 1.0
                    hr[date] = acc
                }
                val rhr = JSArray()
                hr.forEach { (date, acc) ->
                    val o = JSObject()
                    o.put("date", date)
                    o.put("bpm", Math.round(acc[0] / acc[1]))
                    rhr.put(o)
                }

                val out = JSObject()
                out.put("weights", weights)
                out.put("sleep", sleep)
                out.put("restingHeartRate", rhr)
                call.resolve(out)
            } catch (e: Exception) {
                call.reject("读取健康数据失败: ${e.message}")
            }
        }
    }
}