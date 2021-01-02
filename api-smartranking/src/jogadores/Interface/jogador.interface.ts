import { Document } from 'mongoose';
import  * as mongoose  from 'mongoose';

export interface Jogador extends Document {
    [x: string]: any;
    readonly telefoneCelular: string;
    readonly email: string;
    nome: string;
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador: string;
}