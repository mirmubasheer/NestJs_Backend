import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

@Schema()
export class Lead {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  leadId: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  mobileNumber: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
