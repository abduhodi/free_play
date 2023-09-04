import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ name: 'isValidCategoryId', async: true })
@Injectable()
export class IsValidCategoryId implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    id: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (isNaN(+id)) throw new BadRequestException('Id Param must be a number');
    const category = await this.prisma.category.findUnique({
      where: { id: +id },
    });
    if (!category)
      throw new BadRequestException('Category is not exists with this id');
    return true;
  }
}
