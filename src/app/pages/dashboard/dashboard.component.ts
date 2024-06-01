import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {AuthService} from "../../core/services/auth.service";
import {catchError, EMPTY, Observable, tap} from "rxjs";
import {AsyncPipe, NgClass, NgIf} from '@angular/common'
import {Router, RouterLink} from "@angular/router";
import {StorageService} from "../../core/services/storage.service";
import {DataBaseImagesDto} from "../../../types";
import {SideNavComponent} from "./components/side-nav/side-nav.component";

interface FileUpload {
  file: any;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    NgIf,
    NgClass,
    SideNavComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  private _authService = inject(AuthService)
  private router = inject(Router)
  private _storageService: StorageService = inject(StorageService)

  protected formControl ;

  protected images: DataBaseImagesDto[] = []

  previewUrls: string[] = [];

  protected progress$!:Observable<number>

  files: FileList[]  = []

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

  async logoutAction() {
    try {
      await this._authService.logOut();
      await this.router.navigateByUrl('/auth/log-in')
    }catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }


}


