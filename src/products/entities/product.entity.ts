import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { SchemaTypes, Types } from 'mongoose';
@Schema({ timestamps: true })
export class productEntity {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: string;
  @Prop()
  image: string[];
}
export const productSchema = SchemaFactory.createForClass(productEntity);
