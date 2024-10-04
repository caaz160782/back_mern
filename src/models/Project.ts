import mongoose, { Document, Schema ,PopulatedDoc,Types, } from "mongoose";
import {ITask} from './Task'

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks:PopulatedDoc<ITask & Document>[]
}

const projectSchema: Schema<IProject> = new Schema<IProject>({

  projectName: {
    type: String,
    minlength:3 ,
    trim:true,    
    required: [true, "Project projectName is required."],
  },
  clientName: {
    type: String,
    minlength: 5,
    required: [true, "Client clientName is required."],
  },
  description: {
    type: String,
    minlength: 5,
    required: [true, "Description is required."],
  },
  tasks:[
    {
      type:Types.ObjectId,
      ref:'Task'
    }
  ]
},{timestamps:true});

const Project = mongoose.model<IProject>("Project", projectSchema);

export { Project, projectSchema };
