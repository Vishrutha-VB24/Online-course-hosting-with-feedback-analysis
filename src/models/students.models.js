
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
         Type: String,
         requred: true,
      }
   ]
},
   {
      timestamps: true
   })


export const Students = mongoose.model("Students", studentSchema)
