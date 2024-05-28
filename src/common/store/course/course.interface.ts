export type CourseType = {
  id: number
  title: string
  description: string
  videoLink: string
  userServices: {
    id: number
    userId: number
    serviceId: number
  }[]
}
