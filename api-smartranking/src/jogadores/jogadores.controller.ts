import { Body, Controller, Get, Post } from '@nestjs/common';
import{CriarJogadorDto} from './Dto/criar-jogador.dto'
import { Jogador } from './Interface/jogador.interface';
import {JogadoresService} from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
    
    constructor(private readonly jogadoresService:JogadoresService){}
    
    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto:CriarJogadorDto){
            await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
        }

     @Get()
        async consultarJogadores(): Promise<Jogador[]> {
            return this.jogadoresService.consultarTodosJogadores()
            
        }
        
}
    
    
    