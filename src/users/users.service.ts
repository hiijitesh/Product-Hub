import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(
    name: string,
    username: string,
    password: string,
  ): Promise<any> {
    const newUser = await this.userModel.findOne({ username: username });
    if (!newUser) {
      const user = await this.userModel.create({
        name,
        username,
        password,
      });
      user.save();
    } else {
      return 'User already exist';
    }

    return { username: username };
  }
  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser({ username, password }): Promise<User | undefined> {
    return this.userModel.findOne({
      username,
      password,
    });
  }

  async getMe(userId: string): Promise<User | undefined> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw 'User not found';
    }
    return user;
  }
}
