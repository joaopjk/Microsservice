import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './Dto/criar-jogador.dto';
import { Jogador } from './Interface/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { AtualizarJogadorDto } from './Dto/atualizar-jogador.dto';
uuidv4();

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const { email } = criarJogadorDto
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(`Jogador ${email} já cadastrado`)
        }

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save();

    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
        if (jogadorEncontrado) {
            await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec();
        } else {
            throw new NotFoundException(`Jogador ${_id} não se encontra cadastrado ! `);
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorById(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o email ${_id} não encontrado `)
        }
        return jogadorEncontrado
    }

    async consultarJogadoresByEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o email ${email} não encontrado `)
        }
        return jogadorEncontrado
    }

    async deletarJogadorByEmail(email: string): Promise<any> {
        return await this.jogadorModel.deleteOne({ email }).exec();
    }

    async deletarJogadorByID(_id: string) {
        return await this.jogadorModel.deleteOne({ _id }).exec();
    }
}
