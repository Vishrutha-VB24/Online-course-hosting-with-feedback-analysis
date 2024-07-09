import mongoose from 'mongoose';
const { Schema } = mongoose; // Destructure Schema for cleaner syntax

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true, // Ensure efficient username lookups
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true, // Enable faster searches by full name (optional)
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6, // Enforce a minimum password length for security
  },
  phone: {
    type: Number,
    required: true,
 },
 coursesApplied: [
    {
       type: Schema.Types.ObjectId,
       ref: "Course",
    }],
  bio:{
    type:String
  } ,

  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    enum: ['student', 'instructor'], // Allowed role values
    required: true, // Ensure role is specified
  },

    
  
}, {
  timestamps: true, // Include automatic timestamps for document creation/update
});

// Hash password before saving (middleware)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate a random salt for hashing
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err); // Handle potential errors during password hashing
  }
});

// Verify password correctness (method)
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate access token (method)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Generate refresh token (method)
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model('User', userSchema);

export { User };
