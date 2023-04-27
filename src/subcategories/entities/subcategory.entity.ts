import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
@Schema({ timestamps: true })
export class subcategoryEntity {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'categories' })
  category!: Types.ObjectId;
}
export const subcategorySchema =
  SchemaFactory.createForClass(subcategoryEntity);
