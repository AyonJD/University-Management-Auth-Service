import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../faculty/faculty.interface'

export interface IUser {
  id?: string
  password: string
  role: string
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
  admin?: Types.ObjectId //| IAdmin
}

// For using static methods in model:
export interface IUserModel extends Model<IUser> {
  findUserById(): Promise<IUser>
}
