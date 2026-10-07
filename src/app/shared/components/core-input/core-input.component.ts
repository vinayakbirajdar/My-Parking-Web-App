import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-core-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './core-input.component.html',
  styleUrls: ['./core-input.component.scss']
})
export class CommonInputComponent {
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() icon?: string;
  @Input() control!: FormControl;
}