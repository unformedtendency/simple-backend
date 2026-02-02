import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string; displayName?: string },
  ) {
    return this.authService.createUser(
      body.email,
      body.password,
      body.displayName,
    );
  }

  @Get('profile')
  @UseGuards(FirebaseAuthGuard)
  async getProfile(@Req() req) {
    return { uid: req.user.uid, email: req.user.email };
  }
}
