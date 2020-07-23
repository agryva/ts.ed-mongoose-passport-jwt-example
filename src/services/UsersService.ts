import { Inject, Service } from "@tsed/common";
import { MongooseModel, ObjectID } from "@tsed/mongoose";
import { Users } from "../model/Users";
import { Injectable } from "@tsed/di";

@Injectable()
@Service()
export class UsersService {
  @Inject(Users)
  private Users: MongooseModel<Users>;


  async register(user: Users): Promise<Users | any> {
    if (user) {
      const existingUser = await this.Users.findOne({ username: user.username }).exec();

      if (existingUser != null) {
        return {
          message: "Username has already taken"
        }
      }

      const model = new this.Users(user);
      model.hashPassword();
      await model.save();

      return model;
    } else {
      return {
        message: "Data must be not null"
      }
    }
  }

  async findOneById(id: any): Promise<Users | null> {
    if (id) {
      return await this.Users.findOne({ _id: id }).exec()
    } else {
      return null
    }
  }


  async login(username: any, password: any): Promise<Users | null> {
    let user = await this.Users.findOne({ username: username })
      .select("password name username").exec();
    if (user) {
      if (user.comparePassword(password)) return user
      else return null;
    }

    return null;
  }
}