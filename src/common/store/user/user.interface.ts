export type UserRole = 'user' | 'admin'

export type User = {
  id: number
  email: string
  password: string
  role: UserRole
}
