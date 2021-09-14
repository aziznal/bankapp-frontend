import { Injectable } from '@angular/core';
import { BankingAccount } from 'src/app/models/banking-account.model';
import { Transaction } from 'src/app/models/transaction.model';

@Injectable({ providedIn: 'root' })
export class BankingAccountsService {
  bankingAccounts: BankingAccount[] = [
    {
      ownerName: 'you',
      accountNo: '123456789',
      balance: 100,
    },
    {
      ownerName: 'you',
      accountNo: '987654321',
      balance: 200,
    },
    {
      ownerName: 'you',
      accountNo: '123654789',
      balance: 50,
    },
    {
      ownerName: 'you',
      accountNo: '123654789',
      balance: 50,
    },
    {
      ownerName: 'you',
      accountNo: '123654789',
      balance: 50,
    },
    {
      ownerName: 'you',
      accountNo: '123654789',
      balance: 50,
    },
    {
      ownerName: 'you',
      accountNo: '123654789',
      balance: 50,
    },
  ];

  transactions: Transaction[] = [
    {
      transactionNo: '1',
      from: 'me',
      to: 'you',
      action: 'SENT',
      amount: 500,
      date: new Date(Date.now()),
    },
    {
      transactionNo: '2',
      from: 'you',
      to: 'me',
      action: 'SENT',
      amount: 500,
      date: new Date(Date.now()),
    },
    {
      transactionNo: '3',
      from: 'you',
      to: 'me',
      action: 'SENT',
      amount: 500,
      date: new Date(Date.now()),
    },
    {
      transactionNo: '4',
      from: 'me',
      to: 'you',
      action: 'SENT',
      amount: 500,
      date: new Date(Date.now()),
    },
    {
      transactionNo: '5',
      from: 'me',
      to: 'you',
      action: 'SENT',
      amount: 500,
      date: new Date(Date.now()),
    },
  ];

  constructor() {}
}
