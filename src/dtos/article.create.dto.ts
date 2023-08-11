import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class ArticleCreateDto {

  @ApiProperty({ required: true, description: 'makale adı', default: 'makale-1' })
  @IsNotEmpty({ message: 'makale başlığı boş geçilemez' })
  @MaxLength(30, { message: 'makale başlığı maksimum 30 karakter olabilir' })
  @MinLength(5, { message: 'makale başlığı minimum 5 karakter olmalıdır' })
  @AutoMap()
  Name: string;

  @ApiProperty({ required: false, description: 'makale açıklaması', default: 'makale içerik' })
  @MaxLength(200, { message: 'makale içeriği maksimum 200 karakter olmalıdır' })
  @AutoMap()
  Content: string;

  @ApiProperty({ required: false, description: 'makale açıklaması', default: 'makale-1 açıklama' })
  @MaxLength(100, { message: 'makale tanımı maksimum 100 karakter olmalıdır' })
  @AutoMap()
  Description: string;


}