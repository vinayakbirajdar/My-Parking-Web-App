import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-core-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-button.component.html',
  styleUrls: ['./core-button.component.scss']
})
export class CoreButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() width: string = '100%';
  @Input() onClick: () => void = () => { };

  handleClick() {
    if (!this.disabled && this.onClick) {
      this.onClick(); // Call the passed function
    }
  }

}