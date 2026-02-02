import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@Controller()
@UseGuards(FirebaseAuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('greet')
  greetUser(@Query('name') name: string): string {
    return `Hello ${name || 'Guest'}, your NestJS script is working!`;
  }
}
