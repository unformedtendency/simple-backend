import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController, StudentsController, AuthController],
  providers: [AppService, StudentsService, AuthService],
})
export class AppModule { }
