import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule} from '@nestjs/swagger'
import { createDocument } from './config/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');
  SwaggerModule.setup('api', app, createDocument(app));

  await app.listen(4000);
}
bootstrap();
