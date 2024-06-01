import {Component, inject} from '@angular/core';
import {ButtonsComponent} from "../components/buttons/buttons.component";
import {ContainerComponent} from "../components/container/container.component";
import {Router, RouterLink} from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormDto} from "../../../../types";
import {AuthService} from "../../../core/services/auth.service";
import {Subscription} from "rxjs";




@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ButtonsComponent,
    ContainerComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './siqn-up.component.html',
  styleUrl: './siqn-up.component.css'
})
export default class SingUpComponent {
  protected form;
  showPassword: boolean = false;
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;
  private _authService: AuthService = inject(AuthService)
  private _router = inject(Router)
  constructor() {
    this.form = new FormGroup<FormDto>({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ])
    })
  }




  async submit(){
    if (!this.form.valid) return
    try {
      const { email, password } = this.form.value
      const {user} = await this._authService.signUp({
        email: email as string,
        password: password as string
      })

      if (user){
        alert('Account Created')
        this.form.reset()
        await this._router.navigateByUrl('/dashboard')
      }


    }catch (e){
      if (e instanceof Error) {
        alert(`Error if ${e.message}`)
        console.error(e.message)
      }else {
        alert(`Error else ${e}`)
      }
    }
  }
}

