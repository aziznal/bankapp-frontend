import { BankingAccount } from './banking-account.interface';

/**
 * Interface for a user
 *
 * @export
 * @class User
 */
export interface User {
  fullname: string;
  email: string;
  debt: number;

  birthdate?: Date;
  phoneNumber?: string;

  accounts?: BankingAccount[];
}
