import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = true;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
