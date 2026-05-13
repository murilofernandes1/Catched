export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
}

export interface UserResponseDTO {
  id: number;
  username: string;
  email: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
}

export interface UpdateUserDTO {
  username?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  role?: 'user' | 'admin';
}
