export interface LoginDTO {
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    phoneNumber?: string;
    role: 'user' | 'admin';
  };
}

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
}
