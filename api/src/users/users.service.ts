import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      username,
    });
  }

  async create(user: any) {
    const newUser = this.userRepository.create(user);
    const result = await this.userRepository.save(newUser);
    return result;
  }
}
