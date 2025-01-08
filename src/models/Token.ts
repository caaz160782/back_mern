import mongoose, { Document, Schema, Types  } from "mongoose";

export interface IToken extends Document {
  token: string
  user: Types.ObjectId
  createdAT:Date
}

const tokenSchema: Schema = new Schema({
  token: {
    type: String,
    minlength: 6,
    required:true   
  }, 
  user: {
    type: Types.ObjectId,
    ref:'User'
  }, 
  createdAt: {
    type: Date,
    default: Date.now(),
    expires:"10m"
  }
});

const Token = mongoose.model<IToken>("token", tokenSchema);

export { Token, tokenSchema };