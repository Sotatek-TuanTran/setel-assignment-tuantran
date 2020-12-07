import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Setel Assignment API')
    .setDescription('The Setel Assignment API description')
    .setVersion('1.0')
    .addTag('SetelAssignment')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  const PORT = process.env.APIGATEWAY_PORT;
  await app.listen(PORT);
}
bootstrap();
