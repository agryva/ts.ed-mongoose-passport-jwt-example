import { Property, Required, Req } from "@tsed/common"
import { Model, ObjectID, Ref } from "@tsed/mongoose"
import {Users} from "./Users"

@Model({name: "task"})
export class Tasks {
  @ObjectID("id")
  _id: string;
  @Ref(Users)
  user_ref: Ref<Users>;
  @Property()
  detail_task: string
   
}