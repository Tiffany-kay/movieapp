export interface User {
    name: string;
    email: string;
    passwordHash: string;
  }
  
  export const users: { [key: string]: { email: string; password: string } } = {};

  
  export default users;
  