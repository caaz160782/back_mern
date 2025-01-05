import mongoose, { Document, Schema  } from "mongoose";

export interface IUser extends Document {
  name: string;  
  email:string;  
  password:string;  
  confirmed:boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    minlength: 5,
    trim: true,
    required: [true, "user name is required."], 
  },
  email: {
   type: String,
    minlength: 5,
    lowercase:true,
    unique:true,
    required: [true, "email is required."],
  },
  password: {
    type: String,
     minlength: 5,
    required: [true, "email is required."],
   },
   confirmed: {
    type: Boolean,  
    default:false
   },

},{timestamps:true});

const User = mongoose.model<IUser>("User", userSchema);

export { User, userSchema };