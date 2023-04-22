import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 2023;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log('App started on', port);
}
bootstrap();
