import {Component, inject} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {catchError, EMPTY, tap} from "rxjs";
import {UserSchema} from "../../../../types";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {

  private _authService = inject(AuthService)

  protected userInstance: UserSchema | null = null;



  ngOnInit() {
    this._authService.authState.pipe(
      tap((user) => {
        const data = user
        this.userInstance = new UserSchema(
          user?.email as string,
          user?.displayName as string,
          user?.photoURL as string,
          user?.emailVerified as boolean,
          user?.phoneNumber as string,
          user?.providerData[0]?.providerId as string
        )
      }),
      catchError((error) => {
        console.error(error)
        return EMPTY
      })
    ).subscribe()
    console.log(this.userInstance)
  }
}
