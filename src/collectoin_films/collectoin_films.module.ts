import { Module } from '@nestjs/common';
import { CollectoinFilmsService } from './collectoin_films.service';
import { CollectoinFilmsController } from './collectoin_films.controller';

@Module({
  controllers: [CollectoinFilmsController],
  providers: [CollectoinFilmsService],
})
export class CollectoinFilmsModule {}
