import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

let redisClient: ReturnType<typeof createClient> | null = null
let connectionAttempted = false
let connectionFailed = false

async function getRedisClient() {
  // During build time, skip Redis connection
  if (process.env.NODE_ENV === 'production' && !process.env.REDIS_URL) {
    return null
  }

  if (connectionFailed) {
    return null
  }

  if (redisClient) {
    return redisClient
  }

  if (connectionAttempted) {
    return null
  }

  connectionAttempted = true

  try {
    redisClient = createClient({ 
      url: redisUrl,
      socket: {
        connectTimeout: 1000,
        reconnectStrategy: false,
      }
    })
    
    redisClient.on('error', (err) => {
      // Silently handle errors during build
      if (process.env.NEXT_PHASE !== 'phase-production-build') {
        console.error('Redis Client Error:', err)
      }
      connectionFailed = true
    })

    // Set timeout to prevent hanging
    const connectPromise = redisClient.connect()
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Redis connection timeout')), 1000)
    )
    
    await Promise.race([connectPromise, timeoutPromise])
    return redisClient
  } catch (error) {
    connectionFailed = true
    // Don't log during build
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      console.error('Failed to connect to Redis:', error)
    }
    return null
  }
}

export async function getCache(key: string) {
  try {
    const client = await getRedisClient()
    if (!client) return null
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    // Silently fail during build
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      console.error('Redis get error:', error)
    }
    return null
  }
}

export async function setCache(key: string, value: any, expiration = 3600) {
  try {
    const client = await getRedisClient()
    if (!client) return false
    await client.setEx(key, expiration, JSON.stringify(value))
    return true
  } catch (error) {
    // Silently fail during build
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      console.error('Redis set error:', error)
    }
    return false
  }
}

export async function deleteCache(key: string) {
  try {
    const client = await getRedisClient()
    if (!client) return false
    await client.del(key)
    return true
  } catch (error) {
    // Silently fail during build
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      console.error('Redis delete error:', error)
    }
    return false
  }
}

