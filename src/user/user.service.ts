import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  private users:User[] = [
    new User("karlosmario0123@gmail.com","sub"),
    new User("karlos5566@hotmail.com","admin")
  ];
  findAll() {
    return this.users;
  }

  findAdmins() {
    return this.users.filter(us=>us.userType=="admin");
  }

  findSubs(){
    return this.users.filter(us=>us.userType=="sub");
  }
}
