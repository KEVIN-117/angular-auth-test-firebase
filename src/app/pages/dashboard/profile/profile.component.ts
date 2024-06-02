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
          user?.displayName || 'Anonymous',
          user?.photoURL || 'https://firebasestorage.googleapis.com/v0/b/auth-example-9a434.appspot.com/o/uploads%2FCiberamenazas%20y%20Tendencias%202019%20»%20Un%20mundo%20complejo.jpg?alt=media&token=695a38fc-f671-4639-8890-a6afbe7a1b97',
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
