import { BankingAccount } from "./banking-account.model";

/**
 * Interface for a user
 *
 * @export
 * @class User
 */
export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public birthdate?: Date,
    public phoneNumber?: string,
    public accounts?: BankingAccount[]
  ) {}
}
