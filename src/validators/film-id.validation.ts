import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ name: 'isValidFilmId', async: true })
@Injectable()
export class IsValidFilmId implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    id: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (isNaN(+id)) throw new BadRequestException('Id Param must be a number');
    const film = await this.prisma.film.findUnique({
      where: { id: +id },
    });
    if (!film) throw new BadRequestException('Film is not exists with this id');
    return true;
  }
}
