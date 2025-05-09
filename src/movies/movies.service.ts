import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMovieDto): Promise<any> {
    return await this.prisma.movie.create({
      data,
    });
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.movie.findMany();
  }

  async findOne(id: number): Promise<any> {
    return await this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: any): Promise<any> {
    return await this.prisma.movie.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<any> {
    return await this.prisma.movie.delete({
      where: { id },
    });
  }

  async findByGenre(genre: string): Promise<any[]> {
    return await this.prisma.movie.findMany({
      where: {
        genre: {
          equals: genre,
          mode: 'insensitive',
        },
      },
    });
  }

  async findByDirector(director: string): Promise<any[]> {
    return await this.prisma.movie.findMany({
      where: {
        director: {
          contains: director,
          mode: 'insensitive',
        },
      },
    });
  }

  async findByFilters(filters: {
    genre?: string;
    title?: string;
  }): Promise<any[]> {
    const { genre, title } = filters;
    return await this.prisma.movie.findMany({
      where: {
        ...(genre && { genre: { equals: genre, mode: 'insensitive' } }),
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
      },
    });
  }
}
