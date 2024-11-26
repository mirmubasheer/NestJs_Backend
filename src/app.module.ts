import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { VentureModule } from './venture/venture.module';
import { LeadsModule } from './leads/leads.module';
import { UserProfileModule } from './userprofile/userprofile.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://srinivasnani005:Pragadanani$5@cluster0.osbiulq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    UserModule,
    ClientModule,
    VentureModule,
    LeadsModule,
    UserProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//mongodb+srv://srinivasnani005:<password>@cluster0.osbiulq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0