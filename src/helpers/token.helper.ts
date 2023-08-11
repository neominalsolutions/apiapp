
import { Request } from 'express';

export class AccessTokenHelper {

  public static extractTokenFromHeader(request: Request): string | undefined {
    // Bearer q432432.32432432.32432432
    // Basic 32432.32432
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}