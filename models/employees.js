import mongoose from "mongoose";
const textSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    surname: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    salary: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
)
export const Employee = mongoose.model("Employee", textSchema)