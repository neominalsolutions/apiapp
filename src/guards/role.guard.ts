import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenHelper } from "src/helpers/token.helper";
import { jwtConstants } from "src/services/jwt.key";

@Injectable()
export class RolesGuard implements CanActivate {

  // reflector helper sınıfı ile custom tanımlanmış olan decoratorlara erişim yapıyoruz. 
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // context.getHandler(); // actionName
    // yukarıdaki tanım ile action için tanımlanmış olan roles key'ine ait metadata bilgisini çalışma anından reflection ile yakalamak için nestjs tarafında reflector denilen bir servis kullanılır.
    const requiredRoles = this.reflector.get("roles", context.getHandler());
    // actiona tanımlanmış rolleri okuyoruz.

    // RoleTypes tipinde tanımlı bir decorator var mı
    // yoksa demek ki action için bir kontrol mekanizması yok
    console.log('requiredRoles', requiredRoles);

    if (requiredRoles == undefined) {
      return true; // demek actiona rol tanımlanmamış
    } else {

      const request = context.switchToHttp().getRequest();
      const token = AccessTokenHelper.extractTokenFromHeader(request);

      console.log('token', token);

      if (!token) { // request içinde token yoksa zaten 401
        console.log('token-1', token);
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, { publicKey: jwtConstants.secret });

        console.log('payload', payload);
        // eğer payload içerisinde atanmış rol ile action için tanımlanmış role bilgileri eşleşiyorsa true aşlemiyorsa false dön dedik.
        const user = payload;

        return requiredRoles.some((role) => user.roles?.includes(role));

      } catch {
        // verify işleminde herhangi bir hata durumunda 401 exception fırlat.
        throw new UnauthorizedException(); // 401
      }
    }
  }
}