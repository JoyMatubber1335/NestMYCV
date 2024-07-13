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
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/user-create.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/user-update.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Get('/loginuser')
  userIsLoginn(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  //test session

  // @Get('/colors/:color')
  // setCoolor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }
  // @Get('/colors/')
  // getCoolor(@Session() session: any) {
  //   return session.color;
  // }

  //   /auth/1
  // @UseInterceptors(new SerializerInterceptor(UserDto)) // hide the exclude column that define in entity as exclude
  @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
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
