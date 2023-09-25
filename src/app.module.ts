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
import { FavouritesModule } from './favourites/favourites.module';
import { EpisodesModule } from './episodes/episodes.module';
import { CountriesModule } from './countries/countries.module';
import { FilmCountriesModule } from './film_countries/film_countries.module';
import { TvModule } from './tv/tv.module';
import { ActorsModule } from './actors/actors.module';
import { FilmActorsModule } from './film_actors/film_actors.module';
import { CommentsModule } from './comments/comments.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { UserSubscriptionsModule } from './user_subscriptions/user_subscriptions.module';
import { CollectoinsModule } from './collectoins/collectoins.module';
import { CollectoinFilmsModule } from './collectoin_films/collectoin_films.module';
import { TrailersModule } from './trailers/trailers.module';
import { SessionsModule } from './sessions/sessions.module';
import { RolesModule } from './roles/roles.module';
import { AdminRolesModule } from './admin_roles/admin_roles.module';
import { AvatarsModule } from './avatars/avatars.module';
import { PaymentsModule } from './payments/payments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'data'),
    }),
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
    FavouritesModule,
    EpisodesModule,
    CountriesModule,
    FilmCountriesModule,
    TvModule,
    ActorsModule,
    FilmActorsModule,
    CommentsModule,
    SubscriptionsModule,
    UserSubscriptionsModule,
    CollectoinsModule,
    CollectoinFilmsModule,
    TrailersModule,
    SessionsModule,
    RolesModule,
    AdminRolesModule,
    AvatarsModule,
    PaymentsModule,
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
