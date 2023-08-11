import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleTypes } from "./role.enum";
import { RolesGuard } from "src/guards/role.guard";

// authentication sürecinin kontrol edicek bir decorator oluşturduk.
// @Auth()
export function Auth(...roles: RoleTypes[]) {
  return applyDecorators(
    SetMetadata('roles', roles), // bu işaretlemeyi yaparak Role guard içerisinde ilgili actiona girmek için izin verilen rolleri yakalayacağız. Bunun yakalıyabilmek için nestjs de metadata tipinde bir tanımlama yapıyoruz.
    // roles key değerinden ilgili istek atılan actiona ait rolleri yakalamak için bir tanım yaptık.
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth('access-token'), // Jwt üzerinden verify edilmeldir.
  )
}