import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class ArticleUpdateDto {

  @ApiProperty({ required: true, description: 'makale adı', default: 'makale-1' })
  @AutoMap()
  Name: string;

  @ApiProperty({ required: false, description: 'makale açıklaması', default: 'makale içerik' })
  @AutoMap()
  Content: string;

  @ApiProperty({ required: false, description: 'makale açıklaması', default: 'makale-1 açıklama' })
  @AutoMap()
  Description: string;
}