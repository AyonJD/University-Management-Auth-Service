import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'

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

// Static methods:
// userSchema.statics.findUserById = async function (id: string) { }

const userModel = model<IUser, IUserModel>('User', userSchema)
export default userModel
