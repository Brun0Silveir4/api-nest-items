import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  const config = new DocumentBuilder()
  .setTitle('CRUD Items API')
  .setDescription('API para o meu CRUD de items')
  .setVersion('1.0')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  
SwaggerModule.setup('swagger', app, document, {
  jsonDocumentUrl: 'swagger/json',
});


  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
