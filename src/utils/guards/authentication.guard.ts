// custom-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        super();
      }
      
    canActivate(context: ExecutionContext) {
        
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if (!token) {
          throw new UnauthorizedException('Token not found');
        }
    
        const decodedToken = this.decodeToken(token);
        if (!decodedToken) {
          throw new UnauthorizedException('Invalid token');
        }
    
        if (this.isTokenExpired(decodedToken.exp)) {
          throw new UnauthorizedException('Token expired');
        }        
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if(requiredRoles){
          const userRole = decodedToken.role; 
          if (!userRole || !requiredRoles.includes(userRole)) {
            throw new UnauthorizedException('Insufficient permissions');
          }
        }
        request.user_id = decodedToken.user_id;
        return true;
      }
    
      private extractTokenFromRequest(request: any): string {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return null;
        }
        return authHeader.substring(7);
      }
    
      private decodeToken(token: string): any {
        try {
          return jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
          return null;
        }
      }
    
      private isTokenExpired(expirationTime: number): boolean {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        return currentTimeInSeconds >= expirationTime;
      }
}
