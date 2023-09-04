import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Res,
  Query,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  AccessJwtGuard,
  AdminGuard,
  RefreshJwtGuard,
  SelfGuard,
} from '../guards';
import { GetTokenFromCookie, GetUserId, Public } from '../decorators';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { CategoriesService } from '../categories/categories.service';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from '../genres/dto/create-genre.dto';
import { GenresService } from '../genres/genres.service';
import { UpdateGenreDto } from '../genres/dto/update-genre.dto';
import { CreateFilmDto } from '../films/dto/create-film.dto';
import { FilmsService } from '../films/films.service';
import { UpdateFilmDto } from '../films/dto/update-film.dto';
import { UsersService } from '../users/users.service';
import { CreateFilmGenreDto } from '../film_genres/dto/create-film_genre.dto';
import { FilmGenresService } from '../film_genres/film_genres.service';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Admin')
@Controller('admins')
@UseGuards(AccessJwtGuard) //TODO: admin-self guard
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly categoryService: CategoriesService,
    private readonly genreService: GenresService,
    private readonly filmsService: FilmsService,
    private readonly usersService: UsersService,
    private readonly filmGenresService: FilmGenresService,
  ) {}

  @ApiOperation({ summary: 'get-single-admin' })
  @Get('get-profile')
  @UseGuards(AdminGuard)
  findOneAdmin(@GetUserId() id: number) {
    return this.adminsService.findAdmin(id);
  }

  @ApiOperation({ summary: 'self-update-login-admin' })
  @Patch('update-login')
  @UseGuards(AdminGuard)
  updateAdminLogin(
    @GetUserId() id: number,
    @Body() updateLoginDto: UpdateLoginDto,
  ) {
    return this.adminsService.updateAdminLogin(id, updateLoginDto);
  }

  @ApiOperation({ summary: 'self-update-password-admin' })
  @Patch('update-password')
  @UseGuards(AdminGuard)
  updateAdminPassword(
    @GetUserId() id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.adminsService.updateAdminPassword(id, updatePasswordDto);
  }

  @ApiOperation({ summary: 'self-delete-admin' })
  @Delete('delete-profile')
  @UseGuards(AdminGuard)
  removeAdmin(@GetUserId() id: number) {
    return this.adminsService.removeAdmin(id);
  }

  @ApiOperation({ summary: 'sign-in-admin' })
  @Public()
  @Post('sign-in')
  async signin(
    @Body() signinDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.signin(signinDto, res);
  }

  @Public()
  @ApiOperation({ summary: 'refresh-tokens-admin' })
  @Post('refresh')
  @UseGuards(RefreshJwtGuard, AdminGuard)
  async refresh(
    @GetTokenFromCookie('free_play_key') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.refreshTokens(token, res);
  }

  @ApiOperation({ summary: 'sign-out-admin' })
  @Public()
  @UseGuards(RefreshJwtGuard, AdminGuard)
  @Post('sign-out')
  async signout(
    @GetUserId() id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.signout(id, res);
  }

  @ApiOperation({ summary: 'create-category' })
  @UseGuards(AdminGuard)
  @Post('add-category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'update-category' })
  @UseGuards(AdminGuard)
  @Patch('update-category/:id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'delete-category' })
  @UseGuards(AdminGuard)
  @Delete('delete-category/:id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }

  @ApiOperation({ summary: 'add-genre' })
  @UseGuards(AdminGuard)
  @Post('add-genre')
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @ApiOperation({ summary: 'update-genre' })
  @UseGuards(AdminGuard)
  @Patch('update-genre/:id')
  updateGenre(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genreService.update(id, updateGenreDto);
  }

  @ApiOperation({ summary: 'delete-genre' })
  @UseGuards(AdminGuard)
  @Delete('delete-genre/:id')
  removeGenre(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.remove(id);
  }

  @ApiOperation({ summary: 'create-film' })
  @UseGuards(AdminGuard)
  @Post('create-film')
  createFilm(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @ApiOperation({ summary: 'get-all-films' })
  @UseGuards(AdminGuard)
  @Get('get-all-films')
  findAllFilms() {
    return this.filmsService.findAll();
  }

  @ApiOperation({ summary: 'get-film-by-id' })
  @UseGuards(AdminGuard)
  @Get('get-film/:id')
  findOneFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.findOne(id);
  }

  @ApiOperation({ summary: 'update-film-by-id' })
  @UseGuards(AdminGuard)
  @Patch('update-film/:id')
  updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilmDto: UpdateFilmDto,
  ) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @ApiOperation({ summary: 'delete-film-by-id' })
  @UseGuards(AdminGuard)
  @Delete('delete-film/:id')
  removeFilm(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.remove(id);
  }

  @ApiOperation({ summary: 'get-all-users' })
  @UseGuards(AdminGuard)
  @Get('get-all-users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'get-user-by-id' })
  @UseGuards(AdminGuard)
  @Get('get-user-by-id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'delete-user' })
  @UseGuards(AdminGuard)
  @Get('delete-user/:id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserAccount(id);
  }

  @ApiOperation({ summary: 'add-film-genres' })
  @UseGuards(AdminGuard)
  @Post('add-film-genres')
  create(@Body() createFilmGenreDto: CreateFilmGenreDto) {
    return this.filmGenresService.create(createFilmGenreDto);
  }
}
