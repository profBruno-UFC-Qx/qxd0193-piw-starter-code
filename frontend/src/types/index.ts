export type User = {
  id: number
  name: string
  username: string
  password: string
  email: string
  role: Role
}

type Role = {
  id: number
  name: string
}

export interface ApplicationError {
  error: {
    name: string,
    message: string,
  }
}
