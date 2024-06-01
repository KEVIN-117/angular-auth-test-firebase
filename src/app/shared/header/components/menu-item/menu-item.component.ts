import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {HtmlTransformPipe} from "../../../../core/pipes/html-transform.pipe";

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
  @Input() props!: { path: string, label: string, icon: string};
}
