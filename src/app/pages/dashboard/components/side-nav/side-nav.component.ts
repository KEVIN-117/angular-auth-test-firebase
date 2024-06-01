import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NavItemsComponent} from "./nav-items/nav-items.component";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    RouterLink,
    NavItemsComponent
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {

}
