import { Inject, Req } from "@tsed/common";
import {Unauthorized} from "@tsed/exceptions";
import {Arg, OnVerify, Protocol} from "@tsed/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../services/UsersService";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "secretbanget",
    issuer: "localhost",
    audience: "localhost"
  }
})
export class JwtProtocol implements OnVerify {
  @Inject()
  usersService: UsersService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = await this.usersService.findOneById(jwtPayload._id);

    console.log(user);

    if (!user) {
      throw new Unauthorized("Wrong token");
    }

    req.user = user;

    return user;
  }
}