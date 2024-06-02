export type SubscribeDataRequest = {
  userId: number
  serviceId: number
}

export type CreateCourseRequest = {
  title: string
  description: string
  teacher: string
  videoLink: string
}

export type UpdateCourseRequest = {
  id: number
  title: string
  description: string
  teacher: string
  videoLink: string
}
