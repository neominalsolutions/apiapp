import { TokenController } from './controllers/token.controller';
import { ArticleService } from './services/article.service';
import { ArticleController } from './controllers/article.controller';
import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './models/article.entity';
import { Comment } from './models/comment.entity';
import { ArticleMapper } from './mappers/article.mapper';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './services/jwt.key';

@Module({
      imports: [
            TypeOrmModule.forRoot({
                  type: 'mysql',
                  port: 3306,
                  host: 'localhost',
                  username: 'root', // default root, mssql sa
                  password: 'admin',
                  database: 'ArticleDb',
                  entities: [Article, Comment],
                  autoLoadEntities: true
                  // extra:{
                  //       ssl:false,
                  //       options:{
                  //             trustedConnection:true
                  //       }
                  // }
            }),
            TypeOrmModule.forFeature([Article, Comment]), // Repositories için önemli olan ,
            AutomapperModule.forRoot({ // auto mapper class tanımlarını aktif hale getirecek olan modlümüz
                  strategyInitializer: classes()
            }),
            JwtModule.register({ // Jwt module dahil ediyoruz.
                  global: true,
                  secret: jwtConstants.secret,
                  signOptions: { expiresIn: '3600s' },
            }),
      ],
      controllers: [
            TokenController,
            ArticleController, AppController],
      providers: [
            ArticleService, AppService, ArticleMapper, JwtService],
})
export class AppModule { }
