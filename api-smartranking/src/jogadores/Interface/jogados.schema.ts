import * as Mongoose from 'mongoose';

export const JogadorSchema = new Mongoose.Schema({
    telefoneCelular:{type:String},
    email:{type:String,unique:true},
    nome:String,
    ranking:String,
    posicaoRanking:Number,
    urlFotoJogador:String
},{timestamps:true,collection:'jogadores'});
