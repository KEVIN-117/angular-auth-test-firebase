import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderComponent} from "../../shared/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        FooterComponent,
        HeaderComponent,
        RouterOutlet
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
