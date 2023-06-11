import { Model } from 'mongoose'

export type IMonths =
  | 'January' // Fall starts
  | 'February'
  | 'March'
  | 'April' // Fall ends
  | 'May' // Summer starts
  | 'June'
  | 'July'
  | 'August' // Summer ends
  | 'September' // Spring starts
  | 'October'
  | 'November'
  | 'December' // Spring ends

export type ISemesterTitle = 'Spring' | 'Summer' | 'Fall'

export type ISemesterCode = 'SP' | 'SU' | 'FA'

export interface ISemester {
  title: ISemesterTitle
  year: number
  code: ISemesterCode
  startMonth: IMonths
  endMonth: IMonths
}

export interface ISemesterModel extends Model<ISemester> {
  findUserById(): Promise<ISemester>
}
