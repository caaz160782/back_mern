import mongoose, { Document, Schema } from "mongoose";

interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
}

const projectSchema: Schema<IProject> = new Schema<IProject>({
  projectName: {
    type: String,
    minlength:15 ,
    trim:true,    
    required: [true, "Project name is required."],
  },
  clientName: {
    type: String,
    minlength: 1,
    required: [true, "Client name is required."],
  },
  description: {
    type: String,
    minlength: 1,
    required: [true, "Description is required."],
  },
});

// Changed model name to "Project" for clarity
const Project = mongoose.model<IProject>("Project", projectSchema);

export { Project, projectSchema };
