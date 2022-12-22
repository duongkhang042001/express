const redis = require('redis')

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    },
    password: process.env.REDIS_PASSWORD || ""
})

client.on('connect', () => console.log('[+] Redis Client Connected!'))
client.on('error', (err) => console.log('[+] Redis Client Error ', err))

module.exports = client