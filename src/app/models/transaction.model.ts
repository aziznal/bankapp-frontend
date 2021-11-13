import { OtherPerson } from "./other-person.model";

/**
 * Interface for a transaction done between two banking accounts
 *
 * @export
 * @interface Transaction
 */
export interface Transaction {
  id: string;
  action: 'SENT' | 'GOT';
  amount: number;
  date: Date;
  otherPerson: OtherPerson;
}
