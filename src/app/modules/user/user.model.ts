import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin', 'faculty'],
      default: 'user',
    },
  },
  { timestamps: true }
)

const userModel = model<IUser>('User', userSchema)
export default userModel
