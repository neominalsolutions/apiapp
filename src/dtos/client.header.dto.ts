import { ApiProperty } from "@nestjs/swagger";

export class ClientCredentialHeaderDto {
  @ApiProperty()
  clientId: string;

  @ApiProperty()
  clientSecret: string;
}