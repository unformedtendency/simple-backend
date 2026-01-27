import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
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
