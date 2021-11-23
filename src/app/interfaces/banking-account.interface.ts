import { Transaction } from './transaction.interface';

/**
 * Interface for a banking account
 *
 * @export
 * @interface BankingAccount
 */
export interface BankingAccount {
  _id: string;
  label: string;
  balance: number;
  transactions?: Transaction[];
}
