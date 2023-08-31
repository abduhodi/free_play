import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { RedisClientFactory } from './redis-client-factory';

@Module({
  controllers: [RedisController],
  providers: [RedisClientFactory, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
