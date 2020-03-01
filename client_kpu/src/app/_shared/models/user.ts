import { Role } from './role';

interface User {
  id: number;
  nik: number;
  phone: string;
  email: string;
  role: Role;
  name: string;
  pubKey?: string;
  createdAt: number;
}

export default User;
