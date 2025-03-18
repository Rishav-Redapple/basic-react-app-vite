export interface UserData {
  name: string;
  email: string;
  username: string;
  image?: string;
}

export interface UserCredentials {
  id: string;
  password: string;
  token: string;
}

export interface User extends UserData, UserCredentials {}
