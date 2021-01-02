import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './Dto/AtualizarCategoriaDto';
import { CriarCategoriaDto } from './Dto/CriarCategoriaDto';
import { Categoria } from './Interface/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {

        const { categoria } = criarCategoriaDto

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já cadastrada !`)
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save();
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return this.categoriaModel.find().populate('jogadores').exec();
    }

    async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = this.categoriaModel.findOne({ categoria }).exec();
        if (!categoriaEncontrada) {
            throw new NotFoundException();
        }
        else {
            return categoriaEncontrada;
        }
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto) {
        const categoriaEncontrada = this.categoriaModel.findOne({ categoria }).exec();
        if (!categoriaEncontrada) {
            throw new NotFoundException();
        }
        this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto });
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria']
        const idJogador = params['idJogador']

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        const jogadorJaCadastradoNaCategoria = await this.categoriaModel.find({ categoria }).where('jogadores').in(idJogador).exec();
        const jogadarExiste = await this.jogadoresService.consultarJogadorById(idJogador);


        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada !`)
        }
        if (jogadorJaCadastradoNaCategoria.length > 0) {
            throw new BadRequestException(`Jogador ${idJogador} já se encontra cadastrado na categoria ${categoria}`)
        }

        categoriaEncontrada.jogadores.push(idJogador)
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec();
    }

    async consultarCategoriaDoJogador(idJogador: any): Promise<Categoria> {

        const jogadores = await this.jogadoresService.consultarJogadorById(idJogador)

        if (jogadores === null) {
            throw new BadRequestException(`O id ${idJogador} não é um jogador!`)
        }

        return await this.categoriaModel.findOne().where('jogadores').in(idJogador).exec()

    }

}
