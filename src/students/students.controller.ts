import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';

@Controller('students')
@UseGuards(FirebaseAuthGuard)
export class StudentsController {
  constructor(private readonly studentService: StudentsService) { }

  @Get()
  async getAllStudents() {
    return await this.studentService.findAll();
  }

  @Post()
  async addStudent(@Body() body: any) {
    return await this.studentService.createStudent(body);
  }

  @Delete(':id')
  async removeStudent(@Param('id') id: string) {
    return await this.studentService.deleteStudent(id);
  }
}
