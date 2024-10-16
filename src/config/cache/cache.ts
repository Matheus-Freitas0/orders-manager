export interface Cache {

    setCache(key: string, value: any, expirationSeconds: number): Promise<void>
    getCache<T>(key: string): Promise<T | null>
    evictCache(key: string): Promise<void>

}