import { IsNotEmpty } from "class-validator"
import { Jogador } from "src/jogadores/Interface/jogador.interface"
import { Resultado } from "../Interface/desafio.interface"

export class AtribuirDesafioPartidaDto {

    @IsNotEmpty()
    def: Jogador

    @IsNotEmpty()
    resultado: Array<Resultado>

}