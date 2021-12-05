import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Edit dialog component
 *
 * @export
 * @class NewBankingAccountDialog
 * @implements {OnInit}
 */
@Component({
  templateUrl: './new-banking-account-dialog.component.html',
  styleUrls: ['./new-banking-account-dialog.component.scss'],
})
export class NewBankingAccountDialogComponent implements OnInit, OnDestroy {
  @ViewChild('newAccountLabelInput')
  newAccountLabelInput!: ElementRef<HTMLInputElement>;

  /** Keyboard shortcuts subscription */
  subscription!: Subscription;

  /**
   * Creates an instance of NewBankingAccountDialog.
   * @param {IConfirmDialogData} data
   * @param {MatDialogRef<NewBankingAccountDialogComponent>} dialog
   * @memberof NewBankingAccountDialog
   */
  constructor(private dialog: MatDialogRef<NewBankingAccountDialogComponent>) {}

  get newAccountLabel(): string {
    return this.newAccountLabelInput.nativeElement.value;
  }

  /**
   * Registers keyboard shortcuts for confirm when pressed 'y' key
   *
   * @memberof NewBankingAccountDialog
   */
  ngOnInit(): void {
    this.subscription = fromEvent<KeyboardEvent>(document, 'keydown').subscribe(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          this.dialog.close(null);
        }
      }
    );
  }

  /**
   * Unsubscribe on component destroy
   *
   * @memberof NewBankingAccountDialog
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close() {
    this.dialog.close(this.newAccountLabel);
  }
}
