import { Model } from 'mongoose'

export interface IUser {
  id?: string
  password: string
  role: string
  batch: number
}

// For using static methods in model:
export interface IUserModel extends Model<IUser> {
  findUserById(): Promise<IUser>
}
