import { OtherPerson } from './other-person.interface';

/**
 * Interface for a transaction done between two banking accounts
 *
 * @export
 * @interface Transaction
 */
export interface Transaction {
  _id: string;
  action: 'SENT' | 'GOT';
  amount: number;
  date: Date;
  otherPerson: OtherPerson;
}
