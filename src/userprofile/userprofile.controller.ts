import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileService } from './userprofile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  
  @Get('profile')
  @UseGuards(JwtAuthGuard) 
  async getProfile(@Request() req) {
    return this.userProfileService.getUserProfile(req.user.email);
  }
}
