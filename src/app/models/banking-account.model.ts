import { Transaction } from './transaction.model';

/**
 * Interface for a banking account
 *
 * @export
 * @interface BankingAccount
 */
export interface BankingAccount {
  ownerName: string;  // TODO: replace with ID
  accountNo: string;  // TODO: replace with label
  balance: number;
  transactionHistory?: Transaction[]; // TODO: rename to 'transactions'
}
