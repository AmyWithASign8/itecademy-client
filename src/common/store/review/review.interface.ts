export type ReviewType = {
  id: number
  review: string
  createdAt: Date
  userId: number
  user: {
    id: number
    email: string
    password: string
    role: string
  }
}
