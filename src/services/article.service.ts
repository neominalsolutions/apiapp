/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/models/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {

  constructor(@InjectRepository(Article) private articleRepo: Repository<Article>) {

  }

  async create(entity: Article) {
    // save işlemi üzerinden yapalım.
    // this.articleRepo.create(entity); // yeni bir entity instance açar database işlem yapmaz.
    await this.articleRepo.save(entity);
  }

  async update(entity: Article) {
    // await this.articleRepo.update(Number(entity.Id), { Name: entity.Name, Content: entity.Content, Description: entity.Description });
    // save varsa update yoksa insert çalışıyor.
    await this.articleRepo.save(entity);
  }

  async delete(id: number) {
    return await this.articleRepo.delete({ Id: id });
  }

  async getArticles() {
    return await this.articleRepo.find();
  }

  async getById(id: number) {
    // makaleyi commentleri ile birlikte getir.
    return this.articleRepo.findBy({ Id: id });
  }


  getByIdWithComments(id: number) {
    // makaleyi commentleri ile birlikte getir.
    return this.articleRepo.findOne({ where: { Id:id }, relations: { Comments: true } });
  }


}
