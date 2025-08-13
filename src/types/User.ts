export interface CreateUserDTO {
  name: string
  email: string
  password: string
  avatar_url?: string
}

export interface UpdateUserDTO {
  name?: string
  email?: string
  avatar_url?: string
}