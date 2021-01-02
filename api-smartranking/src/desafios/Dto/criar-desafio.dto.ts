import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";
import { Jogador } from '../../jogadores/Interface/jogador.interface';

export class CriarDesafioDto {

    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;
    @IsNotEmpty()
    solicitante: Jogador;
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Array<Jogador>;
}