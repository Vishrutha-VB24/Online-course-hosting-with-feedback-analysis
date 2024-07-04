import mongoose, { Schema } from "mongoose";
const studentSchema = new Schema({
   fullName: {
      type: String,
      required: true,
   },
   userName: {
      type: String,
      required: true,
   },
   email: {
      Type: String,
      required: true,
   },
   password: {
      Type: String,
      requred: true,
   },
   phone: {
      Type: Number,
      required: true,
   },
   coursesApplied: [
      {
         Type: Schema.Types.ObjectId,
         ref: "Course",
      }
   ]
},
   {
      timestamps: true
   })


export const Student = mongoose.model("Student", studentSchema)
