/**
 * Interface for a transaction done between two banking accounts
 *
 * @export
 * @interface Transaction
 */
export interface Transaction {
  transactionNo: string;
  from: string;
  to: string;
  action: 'SENT' | 'RECEIVED';
  amount: number;
  date: Date;
}
