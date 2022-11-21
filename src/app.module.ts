import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { UtilsModule } from './utils/utils.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UtilsModule,
    PostModule,
    MongooseModule.forRoot('mongodb+srv://karlosadmin:karlospsw@cluster0.bsyo01q.mongodb.net/?retryWrites=true&w=majority'),
    UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
