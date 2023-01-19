import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create-user')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    const result = await this.usersService.createUser(
      body.username,
      body.password,
    );
    return result;
  }
}
