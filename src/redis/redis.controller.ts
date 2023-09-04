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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Redis')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @ApiOperation({ summary: 'ping-pong' })
  @Get('ping')
  async redisPing() {
    return this.redisService.ping();
  }

  @ApiOperation({ summary: 'set-key-value-pair' })
  @Post('set')
  set(@Body() setredisDto: SetRedisDto) {
    return this.redisService.set(setredisDto);
  }

  @ApiOperation({ summary: 'get-value-from-key' })
  @Get('get/:key')
  get(@Param('key') key: string) {
    return this.redisService.get(key);
  }
}
