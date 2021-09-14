export interface Transaction {
  transactionNo: string;
  from: string;
  to: string;
  action: 'SENT' | 'RECEIVED';
  amount: number;
  date: Date;
}
