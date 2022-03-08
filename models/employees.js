const mongoose = require("mongoose")
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
const Employee = mongoose.model("Employee", textSchema)
module.exports = { Employee }