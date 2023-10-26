class MemoryCache {
  private cache: Map<string, { data: any; expireAt: number | null }> = new Map()

  private static instance: MemoryCache | null = null

  private constructor() {} // Private constructor to prevent external instantiation

  static getInstance(): MemoryCache {
    if (!MemoryCache.instance) {
      MemoryCache.instance = new MemoryCache()
    }
    return MemoryCache.instance
  }

  set<T>(key: string, value: T, expiresInMs?: number): void {
    const expireAt = expiresInMs ? Date.now() + expiresInMs : null
    this.cache.set(key, { data: value, expireAt })
  }

  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key)

    if (entry && (!entry.expireAt || entry.expireAt > Date.now())) {
      return entry.data as T
    }

    this.cache.delete(key)
    return undefined
  }

  cacheFunction<T>(
    func: (...args: any[]) => Promise<T>,
    cacheKey: string,
    expiresInMs?: number
  ): (...args: any[]) => Promise<T> {
    return async (...args: any[]) => {
      const cachedResult = this.get<T>(cacheKey)
      if (cachedResult !== undefined) {
        return cachedResult
      }
      const result = func(...args)
      this.set(cacheKey, result, expiresInMs)
      return result
    }
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

export default MemoryCache
