import { ApiProperty } from "@nestjs/swagger";

export class ArticleReadDto {

  @ApiProperty({ name: 'articleTitle' })
  title: string;

  @ApiProperty({ name: 'articleContent' })
  body: string;
}