import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilmsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmDto: CreateFilmDto) {
    const film = await this.prisma.film.findFirst({
      where: { title: createFilmDto.title },
    });
    if (film) throw new BadRequestException('Film is already exists');
    return this.prisma.film.create({ data: createFilmDto });
  }
  async findAll() {
    return this.prisma.film.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.film.findMany({ where: { id } });
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.prisma.film.findUnique({ where: { id } });
    if (!film) throw new BadRequestException('Film is not found');
    return this.prisma.film.update({ where: { id }, data: updateFilmDto });
  }

  async remove(id: number) {
    const film = await this.prisma.film.findUnique({ where: { id } });
    if (!film) throw new BadRequestException('Film is not found');
    return this.prisma.film.delete({ where: { id } });
  }
}
