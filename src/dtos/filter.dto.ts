
import { ApiProperty } from "@nestjs/swagger";

export class FilterDto {
  @ApiProperty()
  limit: number;

  @ApiProperty()
  searchText: string;
}