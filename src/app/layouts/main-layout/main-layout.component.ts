import { Component } from '@angular/core';
import { SidebarComponent } from "../../core/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
