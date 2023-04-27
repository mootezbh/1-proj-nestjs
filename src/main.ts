import { ValidationPipe } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, ApiBasicAuth } from '@nestjs/swagger';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ProductsModule } from './products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    ['/api', '/docs-json'],
    basicAuth({
      challenge: true,
      users: { ['admin']: 'admin' },
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('E-commerce') //the title you want for your swagger docs
    .setDescription('E-commerce API description') //description
    .setVersion('1.0') //version setting for the docs
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [CategoriesModule, SubcategoriesModule, ProductsModule], //the modules that you want to include in your swagger docs
  });
  SwaggerModule.setup('api', app, document); // if you want your docs to open up at a different endpoint, you can replace 'api' with endpoint of your choice
  await app.listen(3000);
}
bootstrap();
