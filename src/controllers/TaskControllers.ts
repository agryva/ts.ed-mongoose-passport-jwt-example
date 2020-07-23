import { Controller, Get, Post, Req, Res, HeaderParams, BodyParams } from "@tsed/common";
import { Tasks } from "../model/Tasks";
import { Users } from "../model/Users";
import { TasksService } from '../services/TasksService';
import { Authorize } from "@tsed/passport";

@Controller("/tasks")
export class HelloWorldController {

  constructor(private taskServices: TasksService) {

  }

  @Get("/")
  @Authorize("jwt")
  async getTasks(@Req() req: Req, @HeaderParams("authorization") token: string) {
    const user = req.user as Users;
    const tasks = await this.taskServices.getTask(user._id)
    return tasks;
  }


  @Post("/create")
  @Authorize("jwt")
  async createTasks(@Res() res: Res, @Req() req: Req, @BodyParams("task") task: string) {
    const user = req.user as Users;

    if (task == null) {
      res.status(500);
      return {
        "message" : "task field must be filled in"
      }
    }

    const taskModel = new Tasks();
    taskModel.detail_task = task;
    taskModel.user_ref = user._id;

    return await this.taskServices.createTasks(taskModel);
  }
}
