import { Body, Controller, Post, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  async createUser(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.createUser(name, username, password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getMe(@Param() params) {
    return this.userService.getMe(params.id);
  }
}
