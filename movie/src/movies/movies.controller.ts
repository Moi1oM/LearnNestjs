import { Controller, Get, Param, Post, Delete, Put, Body, Patch, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity'
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }
    
    @Get('/:id')
    getOne(@Param('id') id: number): Movie {
        return this.moviesService.getOne(id);
    }
    
    @Post()
    create(@Body() movieData: CreateMovieDTO) {
        console.log(movieData);
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') id: number) {
        return this.moviesService.deleteOne(id);
    }

    @Put('/:id')
    patch(@Param('id') id: number, @Body() updateData: UpdateMovieDTO) {
        return this.moviesService.update(id, updateData);
    }

    
}
