import { Property, Required, Req } from "@tsed/common"
import { Model, ObjectID, Select } from "@tsed/mongoose"
import * as bcrypt from "bcryptjs";

@Model({ name: "users" })
export class Users {
  @ObjectID("id")
  _id: string;
  @Property()
  name: string;
  @Property()
  username: string;
  @Property()
  @Select(false)
  password: string;
  @Property()
  address: string;
  @Property()
  token: string;


  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  comparePassword(unencrypt: string) {
    console.log("ini password "+this.password)
    return bcrypt.compareSync(unencrypt, this.password);
  }
}