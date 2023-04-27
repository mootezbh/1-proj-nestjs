import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
@Schema()
export class categoryEntity {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop([{ type: SchemaTypes.ObjectId, ref: 'subcategories' }])
  subcategories!: Types.ObjectId[];
}
export const categorySchema = SchemaFactory.createForClass(categoryEntity);
