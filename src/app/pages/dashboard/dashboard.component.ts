import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {AuthService} from "../../core/services/auth.service";
import {Subscription} from "rxjs";
import {Router, RouterLink} from "@angular/router";

interface FileUpload {
  file: any;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  previewUrl: string | ArrayBuffer | null = null;

  isAuthenticated: boolean = false;
  private _authService = inject(AuthService)
  private router = inject(Router)
  protected images: any = []
  protected formControl ;
  user: any;
  constructor() {
    this.formControl = new FormGroup<FileUpload>({
      file: new FormControl(null, [
        Validators.required
      ])
    })

  }

  ngOnInit() {
    this._authService.session().subscribe(user => {
      this.isAuthenticated = !!user
      this.user = user
    })
    console.log(this.isAuthenticated)
  }

  onFileChange(event: Event): void {
    const file = event.target as HTMLInputElement
    if (!file) return
    const dataFile = file.files?.item(0)
    if (!dataFile) return
    this.previewUrl = URL.createObjectURL(dataFile)
  }

  async onSubmit(event: Event) {
    event.preventDefault()
    const file = event.target as HTMLInputElement
    if (!file) return
    // @ts-ignore
    const dataFile = file.profile.files?.item(0)
    try {
      alert('File uploaded successfully')
      this.previewUrl = null
      this.formControl.reset()
    }catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
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
