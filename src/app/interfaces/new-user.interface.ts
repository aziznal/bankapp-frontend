export interface NewUser {
  email: string;
  fullname: string;
  password: string;
  
  birthdate?: Date;
  phoneNumber?: string;
}
