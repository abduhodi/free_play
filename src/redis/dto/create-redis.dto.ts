import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetRedisDto {
  @ApiProperty({
    description: 'The key for the Redis entry',
    example: 'myKey',
  })
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({
    description: 'The value to set in the Redis entry',
    example: 'myValue',
  })
  @IsNotEmpty()
  @IsString()
  value: string;
}
