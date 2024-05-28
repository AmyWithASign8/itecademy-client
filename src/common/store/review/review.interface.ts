export type ReviewType = {
  id: number
  review: string
  userId: number
  user: {
    id: number
    email: string
    password: string
    role: string
  }
}
