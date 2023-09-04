import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFavouriteDto: CreateFavouriteDto, profileId: number) {
    const isExists = await this.prisma.favourite.findFirst({
      where: {
        profileId,
        filmId: createFavouriteDto.filmId,
      },
    });
    if (isExists) {
      await this.prisma.favourite.deleteMany({
        where: {
          profileId,
          filmId: createFavouriteDto.filmId,
        },
      });
      return { message: 'Removed from favourites' };
    }
    await this.prisma.favourite.create({
      data: { ...createFavouriteDto, profileId },
    });
    return { message: 'Removed from favourites' };
  }

  async findAll() {
    return this.prisma.favourite.findMany();
  }

  async findOne(id: number) {
    return this.prisma.favourite.findUnique({ where: { id } });
  }

  async findUserFavourites(userId: number) {
    return this.prisma.favourite.findMany({ where: { profileId: userId } });
  }

  async removeUserFavourites(userId: number, filmId: number) {
    return this.prisma.favourite.deleteMany({
      where: { profileId: userId, filmId },
    });
  }

  async update(id: number, updateFavouriteDto: UpdateFavouriteDto) {
    const isExist = await this.prisma.favourite.findUnique({ where: { id } });
    if (!isExist) throw new BadRequestException('Item is not found');
    return this.prisma.favourite.update({
      where: { id },
      data: updateFavouriteDto,
    });
  }

  async remove(id: number) {
    const isExist = await this.prisma.favourite.findUnique({ where: { id } });
    if (!isExist) throw new BadRequestException('Item is not found');
    return this.prisma.favourite.delete({
      where: { id },
    });
  }
}
