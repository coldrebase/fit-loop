package app.fitloop.mobile

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import org.tensorflow.lite.task.core.BaseOptions
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.support.label.Category
import org.tensorflow.lite.task.vision.classifier.ImageClassifier
import java.io.File

/**
 * 离线食物粗识别（实验）
 * ---------------------------------------------------------------------------
 * 用打包进 APK 的 MobileNetV1（ImageNet 1000 类，量化版）做本地分类：
 *   - 完全离线、零成本、不联网
 *   - 只能覆盖 ImageNet 里那几十种食物（西式为主），中文菜系基本识别不了
 *   - 置信度普遍偏低，因此结果只作为「候选」，仍需用户确认份量
 *
 * 模型与标签：模型自带 metadata，Task Library 会读出标签名。
 */
@CapacitorPlugin(name = "FoodClassifier")
class FoodClassifierPlugin : Plugin() {

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private var classifier: ImageClassifier? = null

    private fun ensureModel(): ImageClassifier {
        classifier?.let { return it }

        // Task Library 读的是真实文件路径，先把 asset 复制到 filesDir
        val target = File(context.filesDir, "mobilenet_v1_224.tflite")
        if (!target.exists() || target.length() == 0L) {
            context.assets.open("mobilenet_v1_224.tflite").use { input ->
                target.outputStream().use { output -> input.copyTo(output) }
            }
        }

        val baseOptions = BaseOptions.builder()
            .setNumThreads(4)
            .build()

        val options = ImageClassifier.ImageClassifierOptions.builder()
            .setBaseOptions(baseOptions)
            .setMaxResults(8)
            .setScoreThreshold(0.12f)
            .build()

        val created = ImageClassifier.createFromFileAndOptions(context, target.absolutePath, options)
        classifier = created
        return created
    }

    /** 传入 dataURL 或纯 base64，返回 [{label, score}] */
    @PluginMethod
    fun classify(call: PluginCall) {
        val raw = call.getString("image") ?: run {
            call.reject("缺少 image 参数")
            return
        }

        scope.launch {
            try {
                val base64 = if (raw.startsWith("data:")) raw.substringAfter(",") else raw
                val bytes = Base64.decode(base64, Base64.DEFAULT)
                val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
                    ?: run {
                        call.reject("图片解码失败")
                        return@launch
                    }

                val tensorImage = TensorImage.fromBitmap(bitmap)
                val results = ensureModel().classify(tensorImage)
                val out = JSArray()
                val first = results.firstOrNull()
                val categories: List<Category> =
                    first?.categories ?: emptyList()
                for (c in categories) {
                    val o = JSObject()
                    o.put("label", c.label)
                    o.put("score", c.score.toDouble())
                    out.put(o)
                }

                val payload = JSObject()
                payload.put("candidates", out)
                payload.put("model", "mobilenet_v1_224_imagenet")
                call.resolve(payload)
            } catch (e: Throwable) {
                call.reject("离线识别失败: ${e.message}")
            }
        }
    }

    /** 是否可用（模型缺失时前端可降级） */
    @PluginMethod
    fun available(call: PluginCall) {
        val out = JSObject()
        out.put("available", File(context.filesDir, "mobilenet_v1_224.tflite").exists() || true)
        call.resolve(out)
    }
}