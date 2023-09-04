import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FilmFilterDto } from './dto/filter.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const cat = await this.prisma.category.findFirst({
      where: { name: createCategoryDto.name },
    });
    if (cat) throw new BadRequestException('Category is already exists');
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return this.prisma.category.findMany({ include: { films: true } });
  }

  async findOneById(id: number, filter: FilmFilterDto) {
    const data = await this.prisma.category.findMany({
      where: {
        id,
      },
      select: { films: { include: { countries: true, genres: true } } },
    });
    if (data.length < 1) throw new NotFoundException('Category is empty');
    const filmData = data[0].films;
    return filmData.filter((film) => {
      let sort = true;
      if (filter.countryId) {
        sort =
          sort &&
          film.countries.some((cnt) => cnt.countryId === filter.countryId);
      }
      if (filter.genreId) {
        sort =
          sort && film.genres.some((cnt) => cnt.genreId === filter.genreId);
      }
      if (filter.rate) {
        sort = sort && film.rate ? film.rate.greaterThan(filter.rate) : false;
      }
      if (filter.year) {
        sort = sort && film.year >= filter.year;
      }
      return sort;
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const cat = await this.prisma.category.findFirst({ where: { id } });
    if (!cat) throw new NotFoundException('Category is not found');
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
