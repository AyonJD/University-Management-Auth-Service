import { Model, Types } from 'mongoose'
import { IFaculty } from '../faculty/faculty.interface'

/* eslint-disable no-unused-vars */
export interface IDepartment {
  title: string
  faculty: Types.ObjectId | IFaculty
}

export interface IDepartmentModel extends Model<IDepartment> {
  findUserById(id: string): Promise<IDepartment>
}

export interface IDepartmentFilter {
  searchTerm?: string
}
