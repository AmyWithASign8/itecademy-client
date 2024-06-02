import { AuthDataType } from '../types/auth.interface'

export const setUserToLc = (dto: AuthDataType) => {
  localStorage.setItem('user', JSON.stringify(dto))
}
