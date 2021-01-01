import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './Dto/criar-jogador.dto';
import { AtualizarJogadorDto } from './Dto/atualizar-jogador.dto';
import { Jogador } from './Interface/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametroPipe } from './Pipe/jogadores-validacao-parametro.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', JogadoresValidacaoParametroPipe) _id: string) {
        await this.jogadoresService.atualizarJogador(_id,atualizarJogadorDto)
    }

    @Get('/:_id')
    async consultarJogadorProId(@Param('_id', JogadoresValidacaoParametroPipe) _id: string): Promise<Jogador> {

        return await this.jogadoresService.consultarJogadorById(_id);
    }

    @Get('/:_email')
    async consultarJogadorPorEmail(@Param('_email', JogadoresValidacaoParametroPipe) _email: string): Promise<Jogador> {

        return await this.jogadoresService.consultarJogadoresByEmail(_email);
    }

    @Get()
    async consutarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.consultarTodosJogadores();
    }

    @Delete('email/:_email')
    async deletarJogadorByEmail(
        @Param('_email', JogadoresValidacaoParametroPipe) _email: string): Promise<void> {
        this.jogadoresService.deletarJogadorByEmail(_email)
    }

    @Delete('id/:_id')
    async deletarJogadorById(
        @Param('_id', JogadoresValidacaoParametroPipe) _id: string): Promise<void> {
        this.jogadoresService.deletarJogadorByID(_id)
    }

}


