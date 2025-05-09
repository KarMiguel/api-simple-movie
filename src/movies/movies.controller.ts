import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
    type: CreateMovieDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid data provided.',
  })
  async create(@Body() createMovieDto: CreateMovieDto) {
    try {
      return await this.moviesService.create(createMovieDto);
    } catch (error) {
      throw new HttpException('Failed to create movie', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all movies with optional filters' })
  @ApiQuery({
    name: 'genre',
    required: false,
    description: 'Filter movies by genre',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter movies by title',
  })
  @ApiResponse({
    status: 200,
    description: 'List of movies retrieved successfully.',
    type: [CreateMovieDto],
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(
    @Query('genre') genre?: string,
    @Query('title') title?: string,
  ) {
    try {
      if (genre || title) {
        return await this.moviesService.findByFilters({ genre, title });
      }
      return await this.moviesService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by ID' })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie found.',
    type: CreateMovieDto,
  })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const movie = await this.moviesService.findOne(id);
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      return movie;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully.',
    type: CreateMovieDto,
  })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid data provided.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    try {
      const movie = await this.moviesService.findOne(id);
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      return await this.moviesService.update(id, updateMovieDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  @ApiResponse({ status: 200, description: 'Movie deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const movie = await this.moviesService.findOne(id);
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      return await this.moviesService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
