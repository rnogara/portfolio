import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors({
    origin: configService.get<string>('VERCEL_URL'),
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await app.listen(configService.get('PORT') ?? 5432);
}
bootstrap().catch((err) => {
  console.error('Error starting server: ', err);
  process.exit(1);
});
