import { STATUS_TASK } from "src/constants/status-task";

export interface ITask {
    taskName: string;
    taskDescription: string;
    status: STATUS_TASK;
    responsibleName: string;
    project: string;
}