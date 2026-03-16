import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreButtonComponent } from '../core-button/core-button.component';

export interface ConfirmPopupDetail {
  label: string;
  value: string;
}

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [CommonModule, CoreButtonComponent],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.scss'
})
export class ConfirmPopupComponent {
  @Input() show = false;
  @Input() title = 'Confirm';
  @Input() details: ConfirmPopupDetail[] = [];
  @Input() confirmLabel = 'OK';
  @Input() cancelLabel = 'Cancel';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  /** Arrow functions so 'this' is correct when passed to core-button as [onClick] */
  onConfirm = () => {
    this.confirm.emit();
  };

  onCancel = () => {
    this.cancel.emit();
  };

  onBackdropClick = () => {
    this.cancel.emit();
  };
}
