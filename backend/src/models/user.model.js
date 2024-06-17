import mongoose from 'mongoose'
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name"],
        minLength: [3, "Name must be greater than 2 characters"],
        maxLength: [30, "Name must be smaller than 30 characters"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "please provide your email"],
        unique: [true, "Provided email is already exist"],
        trim: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },

    phone: {
        type: Number,
        required: [true, "Please provide your Phone no"],
       min:[1000000000,"provide valid phone no"],
       max:[9999999999,"provide a valid phone no"]
    },

    password: {
        type: String,
        required: [true, "please Provide Password"],
        minLength: [8, "Password must contain at least 8 characters!"],
        select: false
        //When select: true is set on a schema path, the field will be included in the query results by default.

        //When select: false is set on a schema path, the field will be excluded from the query results by default.
    },
    role: {
        type: String,
        required: [true, "please select your role"],
        enum: ["Recruiter", 'Job Seeker']
    }           
},
    {
        timestamps: true
    }
)


userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        next();
    const encrypt = await bcrypt.hash(this.password, 10);
    this.password = encrypt
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateJWTToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES,
        }
    )
}


export const User=mongoose.model("User",userSchema)