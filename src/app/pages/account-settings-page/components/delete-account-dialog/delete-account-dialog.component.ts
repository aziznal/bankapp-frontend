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
 * Delete dialog component
 *
 * @export
 * @class DeleteAccountDialogComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss'],
})
export class DeleteAccountDialogComponent implements OnInit, OnDestroy {
  @ViewChild('receivingAccountLabelInput')
  receivingAccountLabelInput!: ElementRef<HTMLInputElement>;

  /** Keyboard shortcuts subscription */
  subscription!: Subscription;

  deletedAccountLabel: string;

  /**
   * Creates an instance of DeleteAccountDialogComponent.
   * @param {IConfirmDialogData} data
   * @param {MatDialogRef<DeleteAccountDialogComponent>} dialog
   * @memberof DeleteAccountDialogComponent
   */
  constructor(
    private dialog: MatDialogRef<DeleteAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { deletedAccountLabel: string }
  ) {
    this.deletedAccountLabel = this.data.deletedAccountLabel;
  }

  get receivingAccountLabel(): string {
    return this.receivingAccountLabelInput.nativeElement.value;
  }

  /**
   * Registers keyboard shortcuts for confirm when pressed 'y' key
   *
   * @memberof DeleteAccountDialogComponent
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
   * @memberof DeleteAccountDialogComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close() {
    this.dialog.close(this.receivingAccountLabel);
  }
}
