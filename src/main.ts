import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response-interceptor';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 2023;

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Short Link')
    .setDescription('API to encode and decode URL.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(port);
  console.log('App started on', port);
}
bootstrap();
