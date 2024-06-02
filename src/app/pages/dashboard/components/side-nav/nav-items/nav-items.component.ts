import {Component, Input} from '@angular/core';
import {NavItemDto} from "../../../../../../types";
import {RouterLink} from "@angular/router";
import {HtmlTransformPipe} from "../../../../../core/pipes/html-transform.pipe";

@Component({
  selector: 'app-nav-items',
  standalone: true,
  imports: [
    RouterLink,
    HtmlTransformPipe
  ],
  templateUrl: './nav-items.component.html',
  styleUrl: './nav-items.component.css'
})
export class NavItemsComponent {
  @Input() props!: NavItemDto;
}
