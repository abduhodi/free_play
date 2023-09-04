import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerFactory } from './logger/loggerFactory';

async function start() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: LoggerFactory('FreePlay'),
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    const port = process.env.PORT || 3001;
    //swagger
    const config = new DocumentBuilder()
      .setTitle('Free Play')
      .setDescription('The film player API')
      .setVersion('1.0')
      .addTag('Nest')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
    // end swagger
    await app.listen(port, () =>
      console.log(`Server is listening on port ${port}`),
    );
  } catch (error) {
    console.log(error);
  }
}
start();
