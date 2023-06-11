import { Response } from 'express'

export interface IPaginationOption {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface IGenericDataWithMeta<T> {
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
  data: T
  message?: string
}

export interface IGenericResponse<T> {
  success?: boolean
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
  data?: T
  message: string
}
