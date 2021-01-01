import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './Dto/criar-jogador.dto';
import { Jogador } from './Interface/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
uuidv4();

@Injectable()
export class JogadoresService {

    //private jogadores:Jogador[] = [];
    //private readonly logger = new Logger(JogadoresService.name)

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criarJogadorDto

        //const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
        if (jogadorEncontrado) {
            await this.atualizar(criarJogadorDto)
        } else {
            await this.criar(criarJogadorDto)
        }

    }
    async consultarTodosJogadores(): Promise<Jogador[]> {
        //return await this.jogadores;
        return await this.jogadorModel.find().exec();
    }
    async consultarJogadoresByEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o email ${email} não encontrado `)
        }
        return jogadorEncontrado
    }
    async deletarJogador(email: string): Promise<any> {
        //const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
        //this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
        return await this.jogadorModel.remove({ email }).exec();
    }
    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save();

    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({ email: criarJogadorDto.email }, { $set: CriarJogadorDto }).exec()
    }

}
