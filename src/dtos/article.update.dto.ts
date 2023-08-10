import { ApiProperty } from "@nestjs/swagger";

export class ArticleUpdateDto {

  @ApiProperty({ required: true })
  body: string;
}