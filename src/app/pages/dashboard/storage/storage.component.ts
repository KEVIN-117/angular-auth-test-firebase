import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {StorageService} from "../../../core/services/storage.service";
import {DataBaseImagesDto} from "../../../../types";
import {NgClass} from "@angular/common";


interface FileUpload {
  file: any;
}

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css'
})
export default class StorageComponent {

  private _authService = inject(AuthService)
  private router = inject(Router)
  private _storageService: StorageService = inject(StorageService)

  protected formControl;

  protected images: DataBaseImagesDto[] = []

  previewUrls: string[] = [];


  files: FileList[] = []


  constructor() {
    this.formControl = new FormGroup<FileUpload>({
      file: new FormControl(null, [
        Validators.required
      ])
    })

  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input || !input.files) return;

    const files = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      this.previewUrls.push(url);
    }
  }

  async onSubmit(event: any) {
    event.preventDefault()
    const files = event.target.profile.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await this._storageService.uploadFile(file)
    }
    this.previewUrls = []
    this.formControl.reset()
  }


}
