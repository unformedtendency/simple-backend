import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
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
