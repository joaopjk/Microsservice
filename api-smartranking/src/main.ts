import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilters } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilters());
  //Swagger
  const options = new DocumentBuilder()
  .setTitle('ApiRanking')
  .setDescription('NestJS/RabbitMQ')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('swagger',app,document);
  
  await app.listen(7800);
}
bootstrap();
