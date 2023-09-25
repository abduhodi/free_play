import { PartialType } from '@nestjs/swagger';
import { CreateUserSubscriptionDto } from './create-user_subscription.dto';

export class UpdateUserSubscriptionDto extends PartialType(CreateUserSubscriptionDto) {}
