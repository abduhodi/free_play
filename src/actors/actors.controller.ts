import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createActor(
    @Body() createActorDto: CreateActorDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.actorsService.create(createActorDto, image);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.actorsService.upload(file);
  }

  @Get()
  findAll() {
    return this.actorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(+id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorsService.remove(+id);
  }

  @Get('image/:name')
  getImage(@Param('name') filename: string) {
    return this.actorsService.getImage(filename);
  }

  @Get('video/:name')
  @Header('Content-Type', 'multipart/data')
  getVideo(@Param('name') filename: string) {
    return this.actorsService.getVideo(filename);
    const file = createReadStream(join(process.cwd(), 'data', filename));
    file.on('data', (data) => console.log(data));
    file.on('error', (err) => console.log(err));
    file.on('end', () => console.log('done'));
    return new StreamableFile(file);
  }
}
