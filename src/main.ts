import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeFirebase } from './firebase.config';

async function bootstrap() {
  initializeFirebase();
  const app = await NestFactory.create(AppModule);

  // Cloud Run expects the app to listen on the PORT env variable
  const port = process.env.PORT || 8080;

  await app.listen(port, '0.0.0.0'); // '0.0.0.0' allows external access
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
