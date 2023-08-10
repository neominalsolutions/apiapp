import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder().setTitle('isNetNodejs').setDescription("Nest API").setVersion("1.0").addTag("IsnetAPI").build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // www.isnet.com/api/articles
  SwaggerModule.setup('api', app, document);

  // validayonları uygulama genelinde aktif yaptık.
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(3000);


}
bootstrap();
