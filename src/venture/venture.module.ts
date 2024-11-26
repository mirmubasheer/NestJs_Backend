import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Venture, VentureSchema } from './schema/venture.schema';
import { VentureService } from './venture.service';
import { VentureController } from './venture.controller';
import { S3Service } from '../client/s3.service';
import { ConfigModule } from '@nestjs/config';  // Import ConfigModule
import { AuthModule } from '../auth/auth.module';  // Import AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venture.name, schema: VentureSchema }]),
    ConfigModule,
    AuthModule,  // Add AuthModule
  ],
  controllers: [VentureController],
  providers: [VentureService, S3Service],
})
export class VentureModule {}
