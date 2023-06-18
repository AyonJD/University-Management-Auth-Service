import { InferSchemaType, Model, Types } from 'mongoose'
import { studentSchema } from './student.model'
import { IFaculty } from '../faculty/faculty.interface'
import { IDepartment } from '../department/department.interface'
import { ISemester } from '../semester/semester.interface'

export interface IStudentName {
  firstName: string
  lastName: string
  middleName: string
}

export interface IStudentGuardian {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

export interface IStudentLocalGuardian {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export interface IStudent {
  id: string
  name: IStudentName //embedded object
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: IStudentGuardian // embedded object
  localGuardian: IStudentLocalGuardian // embedded object
  faculty: Types.ObjectId | IFaculty // reference _id
  department: Types.ObjectId | IDepartment // // reference _id
  semester: Types.ObjectId | ISemester // reference _id
  profileImage?: string
}

export type IStudentModel = Model<IStudent, Record<string, unknown>>
