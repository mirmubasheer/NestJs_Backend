import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Client, ClientSchema } from './schema/client.schema';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { S3Service } from './s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    ConfigModule.forRoot(), // Ensure configuration is loaded
  ],
  providers: [ClientService, S3Service],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
