import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EmailSenderStrategy } from './helpers/emailSenderStrategy';
import { NormalEmailSender } from './helpers/normalEmailSender';
import { SlideshowEmailSender } from './helpers/slideshowEmailSender';
import { Post, PostDocument } from './models/post.schema';
import { SendgridService } from '../utils/sendgrid.service';
import { UserService } from '../user/user.service';

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

      if (!createPostDto.images || createPostDto.images!.length == 0) {
        emailSender = new NormalEmailSender(res, this.emailService, this.userService);
      } else {
        emailSender = new SlideshowEmailSender(res, this.emailService, this.userService);
      }

      emailSender.execute();
      return "Publicación creada exitosamente!";
    } catch (error) {
      console.log(error);
      return "Error al publicar";
    }

  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  /*  update(id: number, updatePostDto: UpdatePostDto) {
     return `This action updates a #${id} post`;
   }
 
   remove(id: number) {
     return `This action removes a #${id} post`;
   } */
}
