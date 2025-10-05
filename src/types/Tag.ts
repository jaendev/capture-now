export interface Tag {
  id: string;
  name: string;
  userId: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTagDTO {
  name: string;
  color: string;
}

export interface CreateTagWithUserDTO {
  name: string;
  userId: string;
  color: string;
}

