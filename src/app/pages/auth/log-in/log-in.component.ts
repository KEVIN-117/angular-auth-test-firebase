import {Component, inject} from '@angular/core';
import {ButtonsComponent} from "../components/buttons/buttons.component";
import {Router, RouterLink} from "@angular/router";
import {ContainerComponent} from "../components/container/container.component";
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ReactiveFormsModule } from "@angular/forms"
import {AuthService} from "../../../core/services/auth.service";


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    ButtonsComponent,
    RouterLink,
    ContainerComponent,
    ReactiveFormsModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export default class LogInComponent{
  protected formControl;
  showPassword: boolean = false;
  private _authService = inject(AuthService)
  constructor(private _router: Router) {
    this.formControl = new FormGroup({
      email: new FormControl('bemiyi7044@crodity.com', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('n%6R7m4Mp6pTsM', [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }




  async onSubmit() {
    if (!this.formControl.valid) return
    try {
      const { email, password } = this.formControl.value
      console.log(email, password)
      const {user} = await this._authService.logIn({
        email: email as string,
        password: password as string
      })
      if (user) {
        alert(`User logged in successfully ${user.email}`)
        await this._router.navigateByUrl('/dashboard')
      }
    }catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

}
