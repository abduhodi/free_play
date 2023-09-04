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
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AccessJwtGuard,
  ActiveUserGuard,
  AdminGuard,
  CheckLoggedInGuard,
} from '../guards';
import { GetProfileIdFromCookie, Public } from '../decorators';

@ApiTags('Favourites')
@UseGuards(AccessJwtGuard)
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @ApiOperation({ summary: 'add-remove-film-to-favourites' })
  @UseGuards(ActiveUserGuard, CheckLoggedInGuard)
  @Post()
  create(
    @Body() createFavouriteDto: CreateFavouriteDto,
    @GetProfileIdFromCookie() profileId: number,
  ) {
    return this.favouritesService.create(createFavouriteDto, profileId);
  }

  @ApiOperation({ summary: 'get-all-items-in-favourites' })
  @UseGuards(AdminGuard)
  @Get('get-favourites')
  findAll() {
    return this.favouritesService.findAll();
  }

  @ApiOperation({ summary: 'get-one-item-in-favourites' })
  @UseGuards(AdminGuard)
  @Get('favourite/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.favouritesService.findOne(id);
  }

  @ApiOperation({ summary: 'get-profile-favourites' })
  @UseGuards(ActiveUserGuard, CheckLoggedInGuard)
  @Get('favourites')
  findProfileFavourites(
    @GetProfileIdFromCookie('free_play_profile_id') profileId: number,
  ) {
    return this.favouritesService.findUserFavourites(profileId);
  }

  @ApiOperation({ summary: 'delete-profile-favourites' })
  @UseGuards(ActiveUserGuard, CheckLoggedInGuard)
  @Delete('favourites/:id')
  deleteProfileFavourites(
    @Param('id', ParseIntPipe) filmId: number,
    @GetProfileIdFromCookie('free_play_profile_id') profileId: number,
  ) {
    return this.favouritesService.removeUserFavourites(profileId, filmId);
  }

  @ApiOperation({ summary: 'delete-one-item-from-favourites' })
  @UseGuards(AdminGuard)
  @Delete('favourites/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.favouritesService.remove(id);
  }
}
