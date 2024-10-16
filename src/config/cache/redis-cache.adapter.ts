import { Cache } from './cache'
import env from '../environments/environments'
import { createClient, RedisClientType } from 'redis'

export class RedisCacheAdapter implements Cache {

    private client!: RedisClientType

    constructor () {
        (async () => this.connect())()
    }

    private async connect(): Promise<void> {
        this.client = createClient({ url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`})
        this.client.on('error', (err) => console.error('redis connection failed. error:', err))
        this.client.on('connect', () => console.log('>> redis connection done with success <<'))
        await this.client.connect()
    }

    async setCache(key: string, value: any, expiration = env.REDIS_DEFAULT_EXP): Promise<void> {
        await this.client.set(key, JSON.stringify(value), { EX: expiration })
    }

    async getCache<T>(key: string): Promise<T | null> {
        const cachedValue = await this.client.get(key)
        if (!cachedValue) return null
        return JSON.parse(cachedValue) as T
    }

    async evictCache(...key: string[]): Promise<void> {   
        await this.client.del(key)
    }

    async evictCacheInBatch(pattern: string): Promise<void> {
        const keys = await this.client.keys(pattern)
        if (keys.length) await this.evictCache(...keys)
    }
}