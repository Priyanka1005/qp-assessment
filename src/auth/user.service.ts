import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private readonly userRepository:Repository<User>) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async createUser(password: string, email: string, phone: string, name: string, address: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds as needed
    const user = this.userRepository.create({ name, password: hashedPassword, email, phone, address });
    return this.userRepository.save(user);
  }

  async updateUser(id: number, newData: Partial<User>): Promise<User | undefined> {
    const user = await this.userRepository.findOne({where:{id}});
    if (!user) {
      return undefined;
    }
    Object.assign(user, newData);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({where:{id}});
  }
}