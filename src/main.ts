import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './config/swagger/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyStatic from 'fastify-static';
import * as path from 'path';
import fmp from 'fastify-multipart';
import helmet from 'fastify-helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(fastifyStatic, { root: path.join(process.cwd()) });
  // app.register(helmet);
  app.register(fmp, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 1000000, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 100, // For multipart forms, the max file size
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  });

  // app.setGlobalPrefix('api');
  SwaggerModule.setup('api', app, createDocument(app));

  await app.listen(4000, '0.0.0.0');
  console.log((await app.getUrl()) + '/api');
}
bootstrap();
