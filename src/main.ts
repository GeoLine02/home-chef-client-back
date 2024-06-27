import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(cookieParser());

  app.use(
    session({
      genid: (_req) => uuidv4(),
      secret: process.env.SESSION_SECRET || 'your-secret-key', // Ensure to use a strong secret key
      resave: false, // Resave only if session data has been modified
      saveUninitialized: false, // Don't save empty sessions
      cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 3600000, // Session expiration time (1 hour in milliseconds)
      },
    }),
  );

  await app.listen(4000);
}
bootstrap();
