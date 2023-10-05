import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  app.enableCors;
  await app.listen(PORT);
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
}
bootstrap();
