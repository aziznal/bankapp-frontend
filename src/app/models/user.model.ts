import { BankingAccount } from "./banking-account.model";

/**
 * Interface for a user
 *
 * @export
 * @class User
 */
export class User {
  constructor(
    public name: string,  // TODO: change to fullname
    public email: string,
    public password: string,  // TODO: remove this
    public birthdate?: Date,
    public phoneNumber?: string,
    public accounts?: BankingAccount[]
  ) {}
}
