const redis = require('redis');

const redisClient = redis.createClient();
const lock = require("redis-lock")(redisClient);

redisClient.connect();

// Define a function to acquire a lock for a given key
async function acquireLock(key) {
    const lockKey = `lock:${key}`;
    const done = await lock(lockKey);
    return done;
}

module.exports = {
    acquireLock
}