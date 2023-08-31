import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';
import { MailModule } from './mail/mail.module';
import { SmsModule } from './sms/sms.module';
import { AccessJwtGuard } from './guards';
import { RefreshJwtGuard } from './guards';
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategies';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.register({ global: true }),
    PrismaModule,
    UsersModule,
    RedisModule,
    MailModule,
    SmsModule,
  ],
  controllers: [],
  providers: [
    AccessJwtGuard,
    RefreshJwtGuard,
    AccessJwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AppModule {}
