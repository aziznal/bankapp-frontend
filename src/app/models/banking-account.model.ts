import { Transaction } from './transaction.model';

/**
 * Interface for a banking account
 *
 * @export
 * @interface BankingAccount
 */
export interface BankingAccount {
  id: string;
  label: string;
  currency: 'TL' | 'DOLLAR' | 'EURO';
  balance: number;
  transactions?: Transaction[];
}
