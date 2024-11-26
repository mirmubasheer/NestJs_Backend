import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VentureDocument = Venture & Document;

@Schema()
export class Venture {
  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  ventureName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop()
  fileLink?: string;  
}

export const VentureSchema = SchemaFactory.createForClass(Venture);
