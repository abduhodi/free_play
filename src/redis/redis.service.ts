import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.types';
import { SetRedisDto } from './dto/create-redis.dto';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
  ) {}

  async onModuleDestroy() {
    return this.redisClient.quit();
  }

  async ping() {
    return this.redisClient.ping();
  }

  async set(setRedisDto: SetRedisDto) {
    const { key, value } = setRedisDto;
    await this.redisClient.set(key, value, { EX: 120 });
    return 'Set ' + key + ': ' + value;
  }

  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async del(key: string) {
    return this.redisClient.del(key);
  }

  async count(key: string) {
    const num = await this.redisClient.get(key);
    if (!num) return null;
    await this.redisClient.set(key, +num + 1);
    return +num + 1;
  }
}
