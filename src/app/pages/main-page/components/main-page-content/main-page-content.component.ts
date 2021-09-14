import { Component, ElementRef, ViewChild } from '@angular/core';
import { BankingAccount } from 'src/app/models/banking-account.model';
import { Transaction } from 'src/app/models/transaction.model';
import { BankingAccountsService } from '../../services/banking-accounts.service';

@Component({
  templateUrl: './main-page-content.component.html',
  styleUrls: ['./main-page-content.component.scss'],
})
export class MainPageContentComponent {
  @ViewChild('accountsList') accountsList!: ElementRef<HTMLDivElement>;

  bankingAccounts: BankingAccount[];

  transactions: Transaction[];

  constructor(private bankingAccountsService: BankingAccountsService) {
    this.bankingAccounts = this.bankingAccountsService.bankingAccounts;
    this.transactions = this.bankingAccountsService.transactions;
  }

  scrollAccountsListToRight() {
    this.accountsList.nativeElement.scrollBy({
      left: 225,
      behavior: 'smooth',
    });
  }

  scrollAccountsListToLeft() {
    this.accountsList.nativeElement.scrollBy({
      left: -225,
      behavior: 'smooth',
    });
  }
}
