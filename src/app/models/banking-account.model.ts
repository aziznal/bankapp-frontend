import { Transaction } from './transaction.model';

/**
 * Interface for a banking account
 *
 * @export
 * @interface BankingAccount
 */
export interface BankingAccount {
  ownerName: string;
  accountNo: string;
  balance: number;
  transactionHistory?: Transaction[];
}
