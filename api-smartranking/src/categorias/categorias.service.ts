import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './Dto/CriarCategoriaDto';
import {Categoria } from './Interface/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) {}

    async criarCategoria(criarCategoriaDto : CriarCategoriaDto): Promise<Categoria>{

        const {categoria} = criarCategoriaDto

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
        if(categoriaEncontrada){
            throw new BadRequestException(`Categoria ${categoria} já cadastrada !`)
        }
        
        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save();
    }    

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return this.categoriaModel.find().exec();
    }

    async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = this.categoriaModel.findOne({categoria}).exec();
        if(!categoriaEncontrada){
            throw new NotFoundException();
        }
        else{
            return categoriaEncontrada;
        }
    }
    
}
