import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@ValidatorConstraint({ name: 'isValidProfileId', async: true })
@Injectable()
export class IsValidProfileId implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(
    id: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (isNaN(+id)) throw new BadRequestException('Id Param must be a number');
    const profile = await this.prisma.profile.findUnique({
      where: { id: +id },
    });
    if (!profile)
      throw new BadRequestException('Profile is not exists with this id');
    return true;
  }
}
