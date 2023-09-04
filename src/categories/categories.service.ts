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
    const sort = {};
    if (filter.countryId) {
      sort['countryId'] = filter.countryId;
    }
    if (filter.genreId) {
      sort['genreId'] = filter.genreId;
    }
    if (filter.rate) {
      sort['rate'] = { gte: filter.rate };
    }
    if (filter.year) {
      sort['year'] = filter.year;
    }
    return this.prisma.category.findMany({
      where: { id },
      include: { parentCategory: true, films: true },
    });
  }

  async findOneByName(name: string) {
    return this.prisma.category.findMany({
      where: { name },
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
