import {Component} from '@angular/core';
import { ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgIf} from '@angular/common'
import { RouterLink, RouterOutlet} from "@angular/router";

import {SideNavComponent} from "./components/side-nav/side-nav.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    NgIf,
    NgClass,
    SideNavComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}


