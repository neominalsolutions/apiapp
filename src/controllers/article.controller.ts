/*
https://docs.nestjs.com/controllers#controllers
*/

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiHeader, ApiHeaders, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { ArticleCreateDto } from 'src/dtos/article.create.dto';
import { ArticleReadDto } from 'src/dtos/article.read.dto';
import { ArticleUpdateDto } from 'src/dtos/article.update.dto';
import { ClientCredentialHeaderDto } from 'src/dtos/client.header.dto';
import { FilterDto } from 'src/dtos/filter.dto';
import { Article } from 'src/models/article.entity';
import { ArticleService } from 'src/services/article.service';
import { Repository } from 'typeorm';

@Controller('articles') // ana route
@ApiTags('ArticleEndPoint') // endpoint etiket ismi
export class ArticleController {


  constructor(private articleService: ArticleService, @InjectMapper() private readonly mapper: Mapper, @InjectRepository(Article) private articleRepo: Repository<Article>) {


  }

  @Get()
  @ApiResponse({
    type: ArticleReadDto
  })
  async getArticles(@Res() res: Response) {

    const entities = await this.articleService.getArticles();
    return res.status(200).send(entities);
  }

  @Get(':id')
  @ApiResponse({
    type: ArticleReadDto
  })
  async getArticleById(@Param('id') id: number, @Res() res: Response) {

    const entity = await this.articleService.getByIdWithComments(Number(id));

    console.log('entity', entity);

    return res.status(200).send(entity);
  }

  @Post()
  async postArticle(@Body() dto: ArticleCreateDto, @Res() res: Response) {

    const entity = this.mapper.map(dto, ArticleCreateDto, Article);
    const response = await this.articleService.create(entity);

    // this.articleRepo.save([entity1,entity2]);

    return res.status(201).send(response);
  }

  @Put(':id')
  async putArticle(@Param('id') id: number, @Body() dto: ArticleUpdateDto, @Res() res: Response) {



    const entity = this.mapper.map(dto, ArticleUpdateDto, Article);
    entity.Id = Number(id); // id set ettmediğimizden yeni bir kayıt açıyor dikkat.
    await this.articleService.update(entity);


    return res.status(204).send();
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: number, @Res() res: Response) {

    await this.articleService.delete(id);

    return res.status(204).send();
  }

  // api/articles?limit=10&searchText=deneme
  @Get('filters')
  // @ApiQuery({
  //   type: Number,
  //   required: true,
  //   name: 'page',
  //   description: 'sayfalama işlemleri için kullanırız'
  // })
  // @ApiQuery({
  //   type: String,
  //   required: false,
  //   name: 'search',
  //   description: 'arama işlemleri için kullanırız'
  // })
  filters(@Query() query: FilterDto, @Res() res: Response) {
    return res.status(200).send([]);
  }

  @Get('fromHeaders')
  // @ApiHeader({ name: 'clientId', description: 'Client Id' })
  // @ApiHeader({ name: 'clientSecret', description: 'clientSecret' })
  fromHeaders(@Headers() headers: ClientCredentialHeaderDto, @Res() res: Response) {
    return res.status(200).send(headers);
  }

}
