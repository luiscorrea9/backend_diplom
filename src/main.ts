import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const config = app.get(ConfigService);
  const port = config.get('PORT');
  console.log("Listen at", port)
  await app.listen(port);
}
bootstrap();
