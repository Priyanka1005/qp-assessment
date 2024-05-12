import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: any) {
    return this.authService.login(credentials);
  }
}
