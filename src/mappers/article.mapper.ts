import { Mapper, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { ArticleCommentDto } from "src/dtos/article.comment.dto";
import { ArticleCreateDto } from "src/dtos/article.create.dto";
import { ArticleReadDto } from "src/dtos/article.read.dto";
import { ArticleUpdateDto } from "src/dtos/article.update.dto";
import { Article } from "src/models/article.entity";
import { Comment } from "src/models/comment.entity";

@Injectable()
export class ArticleMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ArticleCreateDto, Article);
      createMap(mapper, ArticleUpdateDto, Article);
      createMap(mapper, Comment, ArticleCommentDto);
      createMap(mapper, Article, ArticleReadDto);
    };
  }
}
