import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    const port = process.env.PORT || 3001;
    await app.listen(port, () =>
      console.log(`Server is listening on port ${port}`),
    );
  } catch (error) {
    console.log(error);
  }
}
start();
