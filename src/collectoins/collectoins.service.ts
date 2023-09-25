import { Injectable } from '@nestjs/common';
import { CreateCollectoinDto } from './dto/create-collectoin.dto';
import { UpdateCollectoinDto } from './dto/update-collectoin.dto';

@Injectable()
export class CollectoinsService {
  create(createCollectoinDto: CreateCollectoinDto) {
    return 'This action adds a new collectoin';
  }

  findAll() {
    return `This action returns all collectoins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectoin`;
  }

  update(id: number, updateCollectoinDto: UpdateCollectoinDto) {
    return `This action updates a #${id} collectoin`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectoin`;
  }
}
