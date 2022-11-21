import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { EmailSenderStrategy } from './helpers/emailSenderStrategy';
import { NormalEmailSender } from './helpers/normalEmailSender';
import { SlideshowEmailSender } from './helpers/slideshowEmailSender';
import { Post, PostDocument } from './models/post.schema';
import { SendgridService } from '../utils/sendgrid.service';
import { UserService } from '../user/user.service';
import { CreatePostResponseDto } from './dto/create-post-response.dto';

@Injectable()
export class PostService {

  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly emailService: SendgridService,
    private readonly userService: UserService,
  ) { }

  async create(createPostDto: CreatePostDto) {

    try {
      const newPost = new this.postModel({
        title: createPostDto.title,
        text: createPostDto.text,
        tags: createPostDto.tags,
        images: createPostDto.images
      }
      );
      const res = await newPost.save();

      let emailSender: EmailSenderStrategy;

      if (createPostDto.images!.length == 1) {
        emailSender = new NormalEmailSender(res, this.emailService, this.userService);
      } else {
        emailSender = new SlideshowEmailSender(res, this.emailService, this.userService);
      }

      emailSender.execute();
      return new CreatePostResponseDto("Publicación creada exitosamente",0);
    } catch (error) {
      console.log(error);
      return new CreatePostResponseDto("Error al publicar",1);
    }

  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

}
