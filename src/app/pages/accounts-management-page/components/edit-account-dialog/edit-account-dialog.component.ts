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
 * @class EditAccountDialogComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.scss'],
})
export class EditAccountDialogComponent implements OnInit, OnDestroy {
  @ViewChild('newAccountLabelInput')
  newAccountLabelInput!: ElementRef<HTMLInputElement>;

  /** Keyboard shortcuts subscription */
  subscription!: Subscription;

  editedAccountLabel: string;

  /**
   * Creates an instance of EditAccountDialogComponent.
   * @param {IConfirmDialogData} data
   * @param {MatDialogRef<EditAccountDialogComponent>} dialog
   * @memberof EditAccountDialogComponent
   */
  constructor(
    private dialog: MatDialogRef<EditAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { editedAccountLabel: string }
  ) {
    this.editedAccountLabel = this.data.editedAccountLabel;
  }

  get newAccountLabel(): string {
    return this.newAccountLabelInput.nativeElement.value;
  }

  /**
   * Registers keyboard shortcuts for confirm when pressed 'y' key
   *
   * @memberof EditAccountDialogComponent
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
   * @memberof EditAccountDialogComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close() {
    this.dialog.close(this.newAccountLabel);
  }
}
