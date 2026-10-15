import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // CORS: дозволяємо клієнтському застосунку (Vercel / localhost) звертатися до API.
  // У production варто задати FRONTEND_URL, щоб обмежити доступ конкретним доменом.
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  // На Render порт задається через process.env.PORT. Локально використовуємо 3001, щоб не конфліктувати з Next.js (порт 3000).
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
