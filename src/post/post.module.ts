import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './models/post.schema';
import { UtilsModule } from 'src/utils/utils.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), 
  UtilsModule,
  UserModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
