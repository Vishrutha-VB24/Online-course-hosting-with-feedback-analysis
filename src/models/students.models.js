
import mongoose, { Schema } from "mongoose";
import { type } from "os";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   phone: {
      type: Number,
      required: true,
   },
   coursesApplied: [
      {
         type: Schema.Types.ObjectId,
         ref: "Course",
      }
   ],
   refreshToken: {
      type:String
   }
   },
   {
      timestamps: true
   })



studentSchema.pre("save", async function (next) {
   if(!this.isModified("password")) return next();
  
   this.password = await bcrypt.hash(this.password, 10)
   next()
})
  
studentSchema.methods.isPasswordCorrect = async function
(password){
   return await bcrypt.compare(password, this.password)
}
  
studentSchema.methods.generateAccessToken = function(){
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         userName: this.userName,
         fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
   )
}
studentSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
      {
         _id: this._id,
              
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
   )
}



export const Student = mongoose.model("Student", studentSchema)
