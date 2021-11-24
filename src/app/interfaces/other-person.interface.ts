/**
 * The field holding information about the person affected by a transaction
 *
 * @interface OtherPerson
 */
export interface OtherPerson {
  _id: string;
  fullname: string;
  email: string;
  accountLabel: string;
}
