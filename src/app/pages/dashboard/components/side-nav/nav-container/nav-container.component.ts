import {Component, Input} from '@angular/core';
import {NavItemDto} from "../../../../../../types";
import {NavItemsComponent} from "../nav-items/nav-items.component";

@Component({
  selector: 'app-nav-container',
  standalone: true,
  imports: [
    NavItemsComponent
  ],
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.css'
})
export class NavContainerComponent {
  @Input() class: string = '';
  @Input() navItems!: NavItemDto[]
}
