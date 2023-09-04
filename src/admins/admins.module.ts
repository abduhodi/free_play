import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SuperAdminsController } from './super-admins.controller';
import { CategoriesModule } from '../categories/categories.module';
import { GenresModule } from '../genres/genres.module';
import { FilmsModule } from '../films/films.module';
import { UsersModule } from '../users/users.module';
import { FilmGenresModule } from '../film_genres/film_genres.module';

@Module({
  imports: [
    PrismaModule,
    CategoriesModule,
    GenresModule,
    FilmsModule,
    UsersModule,
    FilmGenresModule,
  ],
  controllers: [AdminsController, SuperAdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
