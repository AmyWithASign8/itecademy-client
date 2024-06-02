import { ReactNode } from 'react'

export type TeacherDataType = {
  img: string
  fullName: string
  description: ReactNode
}

export type TeacherCardProps = {
  data: TeacherDataType
}
