import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(userName: string): Promise<User> {
    return await this.usersRepository.findOneBy({
      userName: userName,
    });
  }

  async createUser(username: string, pass: string) {
    const users: { userId: number; username: string; pass: string }[] =
      (await this.cacheManager.get('users')) || [];
    const MaxId = Math.max(...users.map((o) => o.userId), 0);
    const userNew = { userId: MaxId + 1, username, pass };
    users.push(userNew);
    await this.cacheManager.set('users', users, 0);
    return users;
  }
}
