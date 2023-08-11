import { ApiProperty } from "@nestjs/swagger";

export class ArticleCommentDto {

  @ApiProperty({ name: 'commentId' })
  Id: number;

  @ApiProperty({ name: 'commentText' })
  Text: string;

  @ApiProperty({ name: 'commentBy' })
  By: string;
}