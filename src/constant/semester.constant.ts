import {
  IMonths,
  ISemesterCode,
  ISemesterTitle,
} from '../app/modules/semester/semester.interface'

export const SemesterTitle: ISemesterTitle[] = ['Spring', 'Summer', 'Fall']

export const SemesterCode: ISemesterCode[] = ['SP', 'SU', 'FA']

export const Months: IMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/* `SemesterTitleCodeMapper` is an object that maps each semester title to its corresponding semester
code. The object is defined using a TypeScript feature called mapped types, which allows us to
create a new type by transforming each property of an existing type. In this case, the existing type
is `ISemesterTitle`, and we are transforming each property (i.e., each semester title) into its
corresponding `ISemesterCode`. The object is then exported for use in other parts of the codebase. */
export const SemesterTitleCodeMapper: {
  [key in ISemesterTitle]: ISemesterCode
} = {
  Spring: 'SP',
  Summer: 'SU',
  Fall: 'FA',
}

export const SemesterTitleMonthMapper: {
  [key in ISemesterTitle]: IMonths[]
} = {
  Fall: ['January', 'February', 'March', 'April'],
  Summer: ['May', 'June', 'July', 'August'],
  Spring: ['September', 'October', 'November', 'December'],
}

export const SemesterSearchFields: string[] = ['title', 'year', 'code']
