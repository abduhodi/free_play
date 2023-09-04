import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ name: 'isValidGenreId', async: true })
@Injectable()
export class IsValidGenreId implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    id: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (isNaN(+id)) throw new BadRequestException('Id Param must be a number');
    const genre = await this.prisma.genre.findUnique({
      where: { id: +id },
    });
    if (!genre)
      throw new BadRequestException('Genre is not exists with this id');
    return true;
  }
}
