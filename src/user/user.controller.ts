import { Controller, Get, Post, Put, Body, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    try {
      const createdUser = await this.userService.create(createUserDto);
      return `User ${createdUser.name} created successfully.`;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<string> {
    try {
      await this.userService.update(Number(id), updateUserDto);
      return `User with id ${id} updated successfully.`;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<string> {
    await this.userService.remove(Number(id));
    return `User with id ${id} deleted successfully.`;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async removeAll(): Promise<string> {
    await this.userService.removeAll();
    return 'All users deleted successfully.';
  }

  @Get('profile/:encryptedId')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Param('encryptedId') encryptedId: string): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.userService.getUserProfile(encryptedId);
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
