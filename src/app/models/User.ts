export interface User {
  _id?: string;
  name: string;
  email: string;
  pass?: string;
  confirmPass?: string;
  token?: string;
}
