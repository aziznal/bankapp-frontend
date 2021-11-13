/**
 * Interface for a transaction done between two banking accounts
 *
 * @export
 * @interface Transaction
 */
export interface Transaction {
  transactionNo: string;  // TODO: replace with id
  from: string; // TODO: replace with otherPerson
  to: string; // TODO: replace with otherPerson
  action: 'SENT' | 'RECEIVED';  // TODO: replace 'RECEIVED' with 'GOT'
  amount: number;
  date: Date;
}
