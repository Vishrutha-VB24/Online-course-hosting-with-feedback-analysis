import mongoose from "mongoose"
const instructorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        }, //specification, qualification, experience
        refreshToken: {
            type: String
        }
    }, 
    {
         timestamps: true 
    }
)

instructorSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

instructorSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

instructorSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

instructorSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            name:this.name,
            username:this.username,
            email:this.email,
            phoneNumber:this.phoneNumber,
            Bio: this.Bio
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

instructorSchema.methods.generateRefreshToken = function(){
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


export const Instructor = mongoose.model("Instructor", instructorSchema)



