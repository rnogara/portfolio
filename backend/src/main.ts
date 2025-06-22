import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    credentials: true,
  });
  await app.listen(configService.get('PORT') ?? 5432);
}
bootstrap().catch((err) => {
  console.error('Error starting server: ', err);
  process.exit(1);
});
