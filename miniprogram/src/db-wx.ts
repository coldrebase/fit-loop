/**
 * 小程序版存储适配层：用 wx.setStorageSync 取代 IndexedDB。
 * 保持与网页版 src/lib/db.ts 完全相同的导出与语义，这样 repo.ts 及上层逻辑可以原样复用。
 */

const ROOT_KEY = "fitloop:db";

type AnyRecord = Record<string, unknown>;
type DBShape = Record<string, AnyRecord>;

let cache: DBShape | null = null;
const listeners = new Set<() => void>();

function load(): DBShape {
  if (cache) return cache;
  try {
    const raw = wx.getStorageSync(ROOT_KEY);
    cache = raw && typeof raw === "object" ? (raw as DBShape) : {};
  } catch {
    cache = {};
  }
  return cache!;
}

function flush() {
  try {
    wx.setStorageSync(ROOT_KEY, cache ?? {});
  } catch {
    /* 存储写失败时保持内存态，不抛错（与网页版降级行为一致） */
  }
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      /* ignore */
    }
  });
}

function bucket(store: string): AnyRecord {
  const db = load();
  if (!db[store]) db[store] = {};
  return db[store];
}

export const DB_NAME = "fitloop";
export const DB_VERSION = 1;

export function isPersistenceAvailable(): boolean {
  return typeof wx !== "undefined" && typeof wx.setStorageSync === "function";
}

export function isUsingFallback(): boolean {
  return !isPersistenceAvailable();
}

export async function getMeta<T>(key: string): Promise<T | undefined> {
  return (bucket("meta")[key] as T) ?? undefined;
}

export async function getAll<T>(store: string): Promise<T[]> {
  return Object.values(bucket(store)) as T[];
}

export async function getOne<T>(store: string, key: string): Promise<T | undefined> {
  return (bucket(store)[key] as T) ?? undefined;
}

export async function put<T>(store: string, value: T, key?: string): Promise<void> {
  const b = bucket(store);
  const v = value as unknown as AnyRecord;
  const k = key ?? (typeof v?.id === "string" ? (v.id as string) : undefined);
  if (!k) throw new Error(`put(${store}) 需要 key`);
  b[k] = v;
  flush();
}

export async function putMany<T>(store: string, values: T[]): Promise<void> {
  const b = bucket(store);
  for (const value of values) {
    const v = value as unknown as AnyRecord;
    const k = typeof v?.id === "string" ? (v.id as string) : undefined;
    if (k) b[k] = v;
  }
  flush();
}

export async function remove(store: string, key: string): Promise<void> {
  const b = bucket(store);
  delete b[key];
  flush();
}

export async function getByIndex<T>(store: string, index: string, value: unknown): Promise<T[]> {
  const field = index === "byDate" ? "date" : index === "byName" ? "name" : index;
  return (Object.values(bucket(store)) as AnyRecord[]).filter((it) => it[field] === value) as T[];
}

export async function clearStore(store: string): Promise<void> {
  const db = load();
  db[store] = {};
  flush();
}

export async function exportAll(): Promise<Record<string, unknown[]>> {
  const db = load();
  const out: Record<string, unknown[]> = {};
  for (const name of Object.keys(db)) out[name] = Object.values(db[name]);
  return out;
}

export async function wipeAll(): Promise<void> {
  cache = {};
  try {
    wx.removeStorageSync(ROOT_KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      /* ignore */
    }
  });
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}