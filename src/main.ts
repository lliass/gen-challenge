import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api', { exclude: ['/'] });

  await app.listen(3000);
}
bootstrap();
