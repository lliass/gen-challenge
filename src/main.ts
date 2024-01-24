import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api', { exclude: ['/'] });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
