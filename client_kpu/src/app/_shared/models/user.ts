interface User {
  id: number;
  userName: string;
  telepon: string;
  email: string;
  namaLengkap: string;
  alamat: string;
  tanggalLahir: Date;
  foto: string;
  createdAt: number;
  updatedAt: number;
  password?: string;
  pubicKey?: string;
  privateKey?: string;
}

export default User;
