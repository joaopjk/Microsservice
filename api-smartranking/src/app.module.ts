import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import {MongooseModule} from '@nestjs/mongoose'
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:KvsvcZl6NCcwpA0R@cluster0.mj8qo.mongodb.net/smartranking?retryWrites=true&w=majority',
  {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true, useFindAndModify: false}),JogadoresModule, CategoriasModule, DesafiosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
