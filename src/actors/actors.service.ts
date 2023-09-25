import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { PrismaService } from '../prisma/prisma.service';
import { downloadFile, uploadFile } from '../utils';
import { join, resolve } from 'path';
import { statSync } from 'fs';

@Injectable()
export class ActorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActorDto: CreateActorDto, image: any) {
    try {
      console.log(image);
      const { name } = createActorDto;
      const actor = await this.prisma.actor.findFirst({ where: { name } });
      if (actor) throw new BadRequestException('Actor is already exists');
      const filename = await downloadFile(image);
      return this.prisma.actor.create({
        data: {
          name,
          profilePhoto: filename,
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const actors = await this.prisma.actor.findMany();
      if (actors.length < 1) throw new NotFoundException('Actors not found');
      return { count: actors.length, actors };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const actor = await this.prisma.actor.findUnique({ where: { id } });
      if (!actor) throw new NotFoundException('Actor is not found');
      return { actor };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    try {
      const actor = await this.prisma.actor.findUnique({ where: { id } });
      if (!actor) throw new NotFoundException('Actor is not found');
      const updated = await this.prisma.actor.update({
        where: { id },
        data: updateActorDto,
      });
      return { message: 'Update success', updated };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error occured');
    }
  }

  async remove(id: number) {
    try {
      const actor = await this.prisma.actor.findUnique({ where: { id } });
      if (!actor) throw new NotFoundException('Actor is not found');
      const deleted = await this.prisma.actor.delete({
        where: { id },
      });
      return { message: 'Delete success', deleted };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error occured');
    }
  }

  async getImage(filename: string) {
    const filePath = resolve(__dirname, '../../', 'data');
    const url = join(filePath, filename);
  }
  async getVideo(filename: string) {
    const filePath = resolve(__dirname, '..', '..', 'data');
    const url = join(filePath, filename);
    const stat = statSync(url);
    console.log(stat);
  }

  async upload(file: any) {
    return downloadFile(file);
  }
}
