import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;
@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop({
    required: false,
    default: false,
  })
  status?: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task)