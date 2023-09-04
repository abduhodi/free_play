import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ name: 'isValidCountryId', async: true })
@Injectable()
export class IsValidCountryId implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    id: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (isNaN(+id)) throw new BadRequestException('Id Param must be a number');
    const country = await this.prisma.country.findUnique({
      where: { id: +id },
    });
    if (!country)
      throw new BadRequestException('Country is not exists with this id');
    return true;
  }
}
