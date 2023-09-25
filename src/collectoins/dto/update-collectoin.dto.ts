import { PartialType } from '@nestjs/swagger';
import { CreateCollectoinDto } from './create-collectoin.dto';

export class UpdateCollectoinDto extends PartialType(CreateCollectoinDto) {}
