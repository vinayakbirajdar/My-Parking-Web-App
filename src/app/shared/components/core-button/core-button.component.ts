import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Shared primary button used across features.
 * Pass an arrow function to [onClick] so `this` stays correct in the parent.
 */
@Component({
  selector: 'app-core-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-button.component.html',
  styleUrls: ['./core-button.component.scss']
})
export class CoreButtonComponent {
  @Input() label = 'Button';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() width = '100%';
  @Input() onClick: () => void = () => {};

  handleClick() {
    if (!this.disabled) {
      this.onClick();
    }
  }
}