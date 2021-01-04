import redis from 'redis';
import { promisify } from 'util';

//const { REDIS_URL = 'redis://localhost:6379' } = process.env;

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

const init = async () =>
  new Promise((resolve, reject) => {
    redisClient.on('connect', () => {
        resolve(redisClient);
    });

    redisClient.on('error', (error) => {
        console.log(error);
        reject(error);
    });
  });

  const getFromCache = promisify(redisClient.get).bind(redisClient);

export { init, redisClient, getFromCache };