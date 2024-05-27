import { $http } from '../../consts/http'
import { AuthDataType, ErrorResponse } from '../../types/auth.interface'
import { ROLE_WORD } from './user.const'
import { RegistrationUserResponse } from './user.interface'

export const registration: (
  data: AuthDataType
) => Promise<RegistrationUserResponse | ErrorResponse> = async (data) => {
  const response = await $http.post('user/registration', {
    email: data.email,
    password: data.password,
    role: ROLE_WORD.USER
  })

  return response.data
}

export const login: (
  data: AuthDataType
) => Promise<RegistrationUserResponse | ErrorResponse> = async (data) => {
  const response = await $http.post('user/login', {
    email: data.email,
    password: data.password
  })

  return response.data
}

export const deleteAccount = async (id: number) => {
  await $http.delete(`user/delete:${id}`)
}

export const getAllUsers: () => Promise<
  RegistrationUserResponse[]
> = async () => {
  const response = await $http.get('user')

  return response.data
}
