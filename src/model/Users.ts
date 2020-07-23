import { Property, Required, Req } from "@tsed/common"
import { Model, ObjectID, Select } from "@tsed/mongoose"

@Model({ name: "task_users" })
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

}