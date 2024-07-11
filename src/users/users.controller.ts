import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/user-create.dto';
@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
