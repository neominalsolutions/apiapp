/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiHeader, ApiHeaders, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ArticleCreateDto } from 'src/dtos/article.create.dto';
import { ArticleReadDto } from 'src/dtos/article.read.dto';
import { ArticleUpdateDto } from 'src/dtos/article.update.dto';
import { ClientCredentialHeaderDto } from 'src/dtos/client.header.dto';
import { FilterDto } from 'src/dtos/filter.dto';

@Controller('articles') // ana route
@ApiTags('ArticleEndPoint') // endpoint etiket ismi
export class ArticleController {

  @Get()
  @ApiResponse({
    type: ArticleReadDto
  })
  getArticles(@Res() res: Response) {
    return res.status(200).send([]);
  }

  @Get(':id')
  @ApiResponse({
    type: ArticleReadDto
  })
  getArticleById(@Param('id') id: string, @Res() res: Response) {
    return res.status(200).send({});
  }

  @Post()
  postArticle(@Body() body: ArticleCreateDto, @Res() res: Response) {
    return res.status(201).send({});
  }

  @Put(':id')
  putArticle(@Param('id') id: string, @Body() body: ArticleUpdateDto, @Res() res: Response) {
    return res.status(204).send();
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string, @Res() res: Response) {
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
