import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class UserProfileService {
  constructor(private readonly userService: UserService) {}

  async getUserProfile(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const { password, ...userProfile } = user; 
      return userProfile;
    }
    return null;
  }
}
