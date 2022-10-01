const { createClient } = require("redis");
const dotenv = require('dotenv')

dotenv.config()
const redisClient = createClient({
  host: "localhost:3000",
  url: `redis://${process.env.REDIS_HOST}`,
  password: process.env.REDIS_PASSWORD,
  port: 6379,
});

module.exports = redisClient;