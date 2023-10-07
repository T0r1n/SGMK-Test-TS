import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('Front'));
  const PORT = 3000;
  app.enableCors;
  await app.listen(PORT);
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
}
bootstrap();
