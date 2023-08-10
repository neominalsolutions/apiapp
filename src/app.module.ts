import { ArticleService } from './services/article.service';
import { ArticleController } from './controllers/article.controller';
import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [],
  controllers: [
        ArticleController, AppController],
  providers: [
        ArticleService, AppService],
})
export class AppModule {}
