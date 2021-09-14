import { Transaction } from './transaction.model';

export interface BankingAccount {
  ownerName: string;
  accountNo: string;
  balance: number;
  transactionHistory?: Transaction[];
}
