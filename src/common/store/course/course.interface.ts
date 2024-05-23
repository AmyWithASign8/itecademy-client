export type CourseType = {
  id: number
  title: string
  description: string
  userServices: {
    id: number
    userId: number
    serviceId: number
  }[]
}
