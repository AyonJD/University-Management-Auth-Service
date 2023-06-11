import { Model } from 'mongoose'

export type IMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

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
