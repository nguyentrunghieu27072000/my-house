import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findOne(username: string): Promise<any> {
    let users: { userId: number; username: string; pass: string }[] =
      (await this.cacheManager.get('users')) || [];
    if (users.length == 0) {
      await this.cacheManager.set(
        'users',
        [{ userId: 1, username: 'john', pass: 'changeme' }],
        0,
      );
      users = await this.cacheManager.get('users');
    }
    return users.find((user) => user.username === username);
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
