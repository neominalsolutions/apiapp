import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/services/jwt.key";
import { Request } from 'express';
import { AccessTokenHelper } from "src/helpers/token.helper";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();

    const token = AccessTokenHelper.extractTokenFromHeader(request);

    // Bearer qqewqe.dsadsad.sadsad.sadsadsad
    // request.headers.authorization

    if (!token) { // token undefined ise
      console.log('auth-guard', token);
      throw new UnauthorizedException(); // 401 hatası fırlat
    }

    try {
      await this.jwtService.verifyAsync(token, { publicKey: jwtConstants.secret });
      return true;
    } catch {
      // verify edemezse ise 401 fırlatır.
      throw new UnauthorizedException(); // 401
    }

  }


}