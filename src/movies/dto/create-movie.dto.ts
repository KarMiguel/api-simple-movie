import {
  IsString,
  IsInt,
  IsNumber,
  IsUrl,
  IsOptional,
  Min,
  Max,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class CreateMovieDto {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'Inception',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  @Expose() 
  title: string;

  @ApiProperty({
    description: 'Detailed description of the movie plot',
    example:
      'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    minLength: 10,
    maxLength: 1000,
  })
  @IsString()
  @Length(10, 1000)
  @Expose()
  description: string;

  @ApiProperty({
    name: 'releaseYear',
    description: 'Year when the movie was released',
    example: 2010,
    minimum: 1888,
    maximum: new Date().getFullYear(),
  })
  @Expose({ name: 'releaseYear' })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiProperty({
    description: 'Name of the movie director',
    example: 'Christopher Nolan',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @Length(2, 100)
  @Expose()
  director: string;

  @ApiProperty({
    description: 'Movie genre',
    example: 'Sci-Fi',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Length(2, 50)
  @Expose()
  genre: string;

  @ApiProperty({
    description: 'Movie rating from 0 to 10',
    example: 8.8,
    minimum: 0,
    maximum: 10,
  })
  @Expose()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({
    description: 'Movie duration in minutes',
    example: 148,
    minimum: 1,
    maximum: 1000,
  })
  @Expose()
  @IsInt()
  @Min(1)
  @Max(1000)
  duration: number;

  @ApiProperty({
    name: 'posterUrl',
    description: 'URL of the movie poster image',
    example: 'https://example.com/inception-poster.jpg',
    required: false,
  })
  @Expose({ name: 'posterUrl' })
  @IsOptional()
  @IsUrl()
  posterUrl?: string;
}
