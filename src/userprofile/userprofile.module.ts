import { Module } from '@nestjs/common';
import { UserProfileService } from './userprofile.service';
import { UserProfileController } from './userprofile.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [UserProfileService],
  controllers: [UserProfileController],
  exports: [UserProfileService],
})
export class UserProfileModule {}
