import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {HtmlTransformPipe} from "../../../../core/pipes/html-transform.pipe";
import {NavItemDto} from "../../../../../types";

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    RouterLink,
    HtmlTransformPipe
  ],
  templateUrl: './menu-item.component.html',
  styles: ``
})
export class MenuItemComponent {
  @Input() props!: NavItemDto;
}
