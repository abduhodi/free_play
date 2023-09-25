import { Module } from '@nestjs/common';
import { CollectoinsService } from './collectoins.service';
import { CollectoinsController } from './collectoins.controller';

@Module({
  controllers: [CollectoinsController],
  providers: [CollectoinsService],
})
export class CollectoinsModule {}
