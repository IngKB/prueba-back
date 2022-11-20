
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PostImage } from './post-image';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop([String])
  tags: string[];

  @Prop([{title:{type:String},image:{type:String}}])
  images: PostImage[];
}

export const PostSchema = SchemaFactory.createForClass(Post);