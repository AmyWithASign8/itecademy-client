export type AuthDataType = {
  email: string
  password: string
}

export type ErrorResponse = {
  response: {
    data: {
      status: number
      message: string
    }
  }
}
