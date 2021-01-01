import { Controller, UsePipes, ValidationPipe, Body, Post, Get, Param } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './Dto/CriarCategoriaDto';
import { Categoria } from './Interface/categoria.interface';

@Controller('categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto);
    }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>>{
        return await this.categoriasService.consultarTodasCategorias();
    }

    @Get('/:categoria')
    async consultarCategoriaById(@Param('categoria') categoria:string): Promise<Categoria>{
        return await this.categoriasService.consultarCategoriaPeloId(categoria);
    }
}
