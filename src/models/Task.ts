import mongoose, { Document, Schema  , Types} from "mongoose";

const taskStatus ={
    PENDING      : 'pending',
    ON_HOLD      : 'onHold',
    IN_PROGRESS  : 'inProgress',
    UNDER_REVIEW : 'underReview',
    COMPLETED    : 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
  id_project: mongoose.Types.ObjectId;
  name: string;
  description: string;
  status: TaskStatus,
  completedBy: {
    user: Types.ObjectId,
    status: TaskStatus
}[]
}

const taskSchema: Schema<ITask> = new Schema<ITask>({
  id_project: {
    type: Schema.Types.ObjectId, // Use `Schema.Types.ObjectId` for better compatibility
    ref: "Project",
    required: true,
  },
  name: {
    type: String,
    minlength: 3,
    trim: true,
    required: [true, "Task name is required."], 
  },
  description: {
    type: String,
    minlength: 5,
    required: [true, "Description is required."],
  },
  status:{
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  },
  completedBy: [
    {
        user: {
            type:  Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        status: {
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus.PENDING
        }
    }
],
},{timestamps:true});

const Task = mongoose.model<ITask>("Task", taskSchema);

export { Task, taskSchema };
