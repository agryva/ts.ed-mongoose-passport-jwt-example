import {Controller, BodyParams, Get, Req, Post, Required, Status} from "@tsed/common";
import {Users} from "../model/Users"
import { UsersService } from "../services/UsersService";
import {Authenticate, Authorize} from "@tsed/passport";

@Controller("/auth")
export class HelloWorldController {
  constructor(private userService: UsersService) {

  }


  @Post("/register")
  register(
    @BodyParams() @Required() users: Users
  ) {
    return this.userService.register(users);
    // const modelUsers = new Users(users);
  }

  

  @Post("/login")
  @Authenticate("local")
  login(
    @Req() req: Req,@Required() @BodyParams("username") username: string, @Required() @BodyParams("password") password: string
  ) {
    // const modelUsers = new Users(users);
    return req.user;
  }
}
