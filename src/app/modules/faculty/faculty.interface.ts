import { Model } from 'mongoose'

export interface IFaculty {
  title: string
}

export interface IFacultyModel extends Model<IFaculty> {
  findFacultyById(): Promise<IFaculty>
}
