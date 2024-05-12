import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await this.userService.validatePassword(user, password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const userEntity = await this.validateUser(user.email,user.password)
    if(userEntity){
      const payload = { user_id:userEntity.id,email: userEntity.email, name: userEntity.name, phone: userEntity.phone, role:userEntity.role };
      return {
        statusCode:200,
        message:"Login Successful",
        access_token: this.jwtService.sign(payload),
      };
    }
    return {statusCode:401, message:"Authentication Failed"};
  }
}