import {inject, Injectable} from '@angular/core';

import {Credentials, UserDto} from "../../../types";
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth)

  readonly authState = authState(this.auth)

  getAuthStateChanges() {

  }

  session() {
    return this.authState
  }

  signUp(credential: Credentials) {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  logIn(credential: Credentials){
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    )
  }

  logOut(){
    return this.auth.signOut()
  }
}
