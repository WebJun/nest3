import { Get, Controller, Post, Body, Put, Delete } from '@nestjs/common';
import { Param, HttpCode, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Express } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    // await new Promise((resolve) => setTimeout(resolve, 10000)); 10초 대기
    return await this.userService.findAll();
  }
  @Get(':id')
  async show(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }
  @Post()
  async store(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return await this.userService.update(id, user);
  }
  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: number) {
    return await this.userService.destroy(id);
  }
}
