import {Component, Input} from '@angular/core';
import {DataBaseImagesDto} from "../../../../../types";

@Component({
  selector: 'app-gallery-item',
  standalone: true,
  imports: [],
  templateUrl: './gallery-item.component.html',
  styleUrl: './gallery-item.component.css'
})
export class GalleryItemComponent {
  @Input() props !: DataBaseImagesDto
}
