import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword, comparePassword, decrypt } from './crypto.utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const lastUser = await this.userModel.findOne().sort('-id').exec();
    const nextId = lastUser ? lastUser.id + 1 : 1;

    const hashedPassword = hashPassword(createUserDto.password);

    const createdUser = new this.userModel({
      ...createUserDto,
      id: nextId,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: number): Promise<UserDocument> {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<void> {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userModel.findOne({ email: updateUserDto.email }).exec();
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedData = {
      ...updateUserDto,
      password: updateUserDto.password ? hashPassword(updateUserDto.password) : user.password,
    };

    await this.userModel.updateOne({ id }, updatedData).exec();
  }

  async remove(id: number): Promise<User> {
    const user = await this.userModel.findOneAndDelete({ id }).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async removeAll(): Promise<void> {
    await this.userModel.deleteMany({}).exec();
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return comparePassword(plainPassword, hashedPassword);
  }

  async getUserProfile(encryptedId: string): Promise<Omit<User, 'password'>> {
    try {
      const decryptedId = decrypt(encryptedId);
      const userId = parseInt(decryptedId, 10);
      const user = await this.findOne(userId);

      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
