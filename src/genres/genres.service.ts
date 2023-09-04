import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    const genre = await this.prisma.genre.findFirst({
      where: { name: createGenreDto.name },
    });
    if (genre) throw new BadRequestException('Genre is already exists');
    return this.prisma.genre.create({ data: createGenreDto });
  }

  async findAll() {
    return this.prisma.genre.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.genre.findMany({
      where: { id },
      select: { films: true },
    });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.prisma.genre.findFirst({
      where: { id },
    });
    if (!genre) throw new BadRequestException('Genre is not found');
    return this.prisma.genre.update({ where: { id }, data: updateGenreDto });
  }

  async remove(id: number) {
    const genre = await this.prisma.genre.findFirst({
      where: { id },
    });
    if (!genre) throw new BadRequestException('Genre is not found');
    return this.prisma.genre.delete({ where: { id } });
  }
}
