import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
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
      enum: ['student', 'admin', 'faculty'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // it will show the _id as id as a extra field but it will not be stored in the database. For using mulitple databases, it is important to have this field. like postgresql has id as primary key not _id
    },
  }
)

// Static methods:
// userSchema.statics.findUserById = async function (id: string) { }

const userModel = model<IUser, IUserModel>('User', userSchema)
export default userModel
