import mongoose from "mongoose";

export class Validators {
  static isValidID(id: string) {
    return mongoose.isValidObjectId(id)
  }
}