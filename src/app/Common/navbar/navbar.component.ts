import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() menuClick = new EventEmitter<void>();

  onMenuClick() {
    console.log('Navbar menu clicked');

    this.menuClick.emit();
  }

}
