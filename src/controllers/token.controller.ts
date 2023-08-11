/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { TokenRequestDto } from 'src/dtos/token.request.dto';
import { jwtConstants } from 'src/services/jwt.key';
import { Response } from 'express';

@Controller('tokens')
@ApiTags('JWTToken')
export class TokenController {
  constructor(private jwt: JwtService) { }

  @Post()
  async generateToken(@Body() dto: TokenRequestDto, @Res() res: Response) {

    if (dto.username == "nihat" && dto.password == "1234") {

      // decoded
      const payload = {
        sub: 1,
        username: dto.username,
        roles: ['admin']
      }
      // encode
      // xuyuasdsad.sadsad.dsasadsad

      // this.jwt.decode("asdsadsadsad"); payload:{sub:1,username:'nihat'}

      const token = await this.jwt.signAsync(payload, { privateKey: jwtConstants.secret });

      res.status(200).send(token);
    } else {
      res.status(401).send({ message: "Kullanıcı adı veya parola hatalı" });
    }

  }

}
