import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/user-create.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/user-update.dto';
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
  //   /auth/1
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  //   /auth?email=rana@gmail.com
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
