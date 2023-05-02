import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class UsersView {
  @Get()
  @Render('users_index')
  async findAll(): Promise<any[]> {
    return [];
  }
}
