import { Model, Types } from 'mongoose'
import { IFaculty } from '../faculty/faculty.interface'

/* eslint-disable no-unused-vars */
export interface IDepertment {
  title: string
  faculty: Types.ObjectId | IFaculty
}

export interface IDepertmentModel extends Model<IDepertment> {
  findUserById(id: string): Promise<IDepertment>
}

export interface IDepertmentFilter {
  searchTerm?: string
}
