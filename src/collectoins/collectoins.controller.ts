import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectoinsService } from './collectoins.service';
import { CreateCollectoinDto } from './dto/create-collectoin.dto';
import { UpdateCollectoinDto } from './dto/update-collectoin.dto';

@Controller('collectoins')
export class CollectoinsController {
  constructor(private readonly collectoinsService: CollectoinsService) {}

  @Post()
  create(@Body() createCollectoinDto: CreateCollectoinDto) {
    return this.collectoinsService.create(createCollectoinDto);
  }

  @Get()
  findAll() {
    return this.collectoinsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectoinsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectoinDto: UpdateCollectoinDto) {
    return this.collectoinsService.update(+id, updateCollectoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectoinsService.remove(+id);
  }
}
