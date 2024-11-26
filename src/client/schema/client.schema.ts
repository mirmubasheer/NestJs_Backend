import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({ required: true, unique: true })
  clientid: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  filelink?: string; // Optional URL of the uploaded file in S3
}

export const ClientSchema = SchemaFactory.createForClass(Client);
