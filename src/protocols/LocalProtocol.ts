import {BodyParams, Constant, Inject, Req, Res} from "@tsed/common";
import {Unauthorized} from "@tsed/exceptions";
import {OnVerify, Protocol} from "@tsed/passport";
import * as jwt from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";
import { Users } from "../model/Users";
import { MongooseModel } from "@tsed/mongoose";
import { UsersService } from "../services/UsersService";


@Protocol<IStrategyOptions>({
  name: "local",
  useStrategy: Strategy,
  settings: {
    usernameField: "username",
    passwordField: "password"
  }
})
export class LocalProtocol implements OnVerify {
  @Inject()
  usersService: UsersService;

  // @Inject(Users)
  // private Users: MongooseModel<Users>;

  @Constant("passport.protocols.jwt.settings")
  jwtSettings: any;

  async $onVerify(@Res() res: Res, @Req() request: Req, @BodyParams() credentials: any) {
    const { username, password } = credentials;
    
    const user = await this.usersService.login(username, password);
    
    if (!user) {
      res.status(401);
      return {
        message: "Incorrect username or password"
      }
    }

    const token = this.createJwt(user);

    return {
      token: token
    };
  }

  createJwt(user: Users) {
    const {issuer, audience, secretOrKey, maxAge = 3600} = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        _id: user._id,
        exp: now + maxAge * 1000,
        iat: now
      },
      "secretbanget"
    );
  }
}