import { Module } from '@nestjs/common';
import { TrailersService } from './trailers.service';
import { TrailersController } from './trailers.controller';

@Module({
  controllers: [TrailersController],
  providers: [TrailersService],
})
export class TrailersModule {}
