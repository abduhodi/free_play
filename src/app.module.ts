import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';
import { MailModule } from './mail/mail.module';
import { SmsModule } from './sms/sms.module';
import {
  AccessJwtGuard,
  AdminGuard,
  CheckLoggedInGuard,
  RefreshJwtGuard,
  SuperAdminGuard,
} from './guards';
import {
  AccessJwtStrategy,
  CheckLoggedInStrategy,
  RefreshJwtStrategy,
} from './strategies';
import { ProfilesModule } from './profiles/profiles.module';
import { CategoriesModule } from './categories/categories.module';
import { AdminsModule } from './admins/admins.module';
import { GenresModule } from './genres/genres.module';
import { FilmsModule } from './films/films.module';
import { IsValidCategoryId, IsValidFilmId, IsValidGenreId } from './validators';
import { FilmGenresModule } from './film_genres/film_genres.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.register({ global: true }),
    PrismaModule,
    UsersModule,
    RedisModule,
    MailModule,
    SmsModule,
    ProfilesModule,
    CategoriesModule,
    AdminsModule,
    GenresModule,
    FilmsModule,
    FilmGenresModule,
  ],
  controllers: [],
  providers: [
    AccessJwtGuard,
    RefreshJwtGuard,
    CheckLoggedInGuard,
    AdminGuard,
    SuperAdminGuard,
    AccessJwtStrategy,
    RefreshJwtStrategy,
    CheckLoggedInStrategy,
    IsValidCategoryId,
    IsValidFilmId,
    IsValidGenreId,
  ],
})
export class AppModule {}
