import { ApiProperty } from "@nestjs/swagger";
import { ArticleCommentDto } from "./article.comment.dto";

export class ArticleReadDto {

  @ApiProperty({ name: 'articleid' })
  Id: number;

  @ApiProperty({ name: 'title' })
  Name: string;

  @ApiProperty({ name: 'body' })
  Content: string;

  @ApiProperty({ name: 'description' })
  Description?: string;

  @ApiProperty({ name: 'comments' })
  Comments: ArticleCommentDto[];


}