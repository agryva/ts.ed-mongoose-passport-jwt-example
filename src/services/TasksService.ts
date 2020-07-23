import {Inject, Service} from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { Tasks } from "../model/Tasks";
import { Injectable } from "@tsed/di";

@Injectable()
@Service()
export class TasksService {
  @Inject(Tasks)
  private Tasks: MongooseModel<Tasks>;

  async getTask(user_ref: any): Promise<Tasks[]|null> {
    return await this.Tasks
      .find({ user_ref: user_ref })
      .populate("user_ref")
      .exec();
  }

  async createTasks(task: Tasks): Promise<Tasks|null> {
    const model = new this.Tasks(task);
    await model.updateOne(task, { upsert: true });

    return model;

  }

}