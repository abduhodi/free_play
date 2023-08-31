import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RedisService } from './redis.service';
import { SetRedisDto } from './dto/create-redis.dto';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('ping')
  async redisPing() {
    return this.redisService.ping();
  }

  @Post('set')
  set(@Body() setredisDto: SetRedisDto) {
    return this.redisService.set(setredisDto);
  }

  @Get('get/:key')
  get(@Param('key') key: string) {
    return this.redisService.get(key);
  }
}
