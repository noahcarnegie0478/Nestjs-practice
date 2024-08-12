import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UesersService {
  private readonly users: User[] = [
    { id: 1, name: 'Marius', username: 'marius', password: 'sosecure' },
    { id: 1, name: 'Mambo', username: 'mambo', password: 'dumbo' },
  ];

  async findOne(username: string): Promise<User | undefined> {
    const result = this.users.find((user) => user.username === username);
    return result;
  }
}
