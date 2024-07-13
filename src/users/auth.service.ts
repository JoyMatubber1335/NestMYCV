import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // step 1: Check the emain is already exist
    const user = await this.userService.find(email);
    if (user.length) {
      throw new BadRequestException('Email already exist ');
    }
    // step 2: Has thhe pass
    // Generate a salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt together
    const hashPassword = hash.toString('hex') + '.' + salt;
    // step 3: create and save new user

    // step 4: return the user

    const userCreate = await this.userService.create(email, hashPassword);
    return userCreate;
  }

  async signin(email: string, password: string) {
    // find user with email
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // get the user hash and salt
    const [storedHash, salt] = user.password.split('.');
    // join the password and salt

    // const pass = password + salt;
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const resultHash = hash.toString('hex');
    if (storedHash === resultHash) {
      return user;
    }
    throw new BadRequestException('Passwornd is not match');
  }
}
