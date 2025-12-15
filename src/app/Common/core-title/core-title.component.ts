import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-core-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-title.component.html',
  styleUrls: ['./core-title.component.scss']
})
export class CoreTitleComponent {
  @Input() text: string = '';
}