import {Component, inject} from '@angular/core';
import {catchError, EMPTY, Observable, tap} from "rxjs";
import {StorageService} from "../../core/services/storage.service";
import {DataBaseImagesDto} from "../../../types";
import {NgClass} from "@angular/common";
import {GalleryItemComponent} from "./components/gallery-item/gallery-item.component";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    NgClass,
    GalleryItemComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export default class GalleryComponent {
  private _storageService: StorageService = inject(StorageService)


  protected images: DataBaseImagesDto[] = []

  ngOnInit() {
    this._storageService.getImages().pipe(
      tap((images) => {
        this.images = images
      }),
      catchError((error) => {
        console.error(error)
        return EMPTY
      })
    ).subscribe()

  }

  ngOnChanges() {
    this._storageService.getImages().pipe(
      tap((images) => {
        this.images = images
      }),
      catchError((error) => {
        console.error(error)
        return EMPTY
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this._storageService.getImages().subscribe().unsubscribe()
  }
}
