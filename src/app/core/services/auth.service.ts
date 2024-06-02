import {inject, Injectable} from '@angular/core';

import {Credentials} from "../../../types";
import {
  Auth,
  AuthProvider,
  authState,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential
} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth)

  readonly authState = authState(this.auth)

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

  profile(){

  }
  // providers authentication google and github

  async googleAuth(){
    const provider = new GoogleAuthProvider()
    return this.authProvider(provider)
  }

  githubAuth(){
    const provider = new GithubAuthProvider()
    return this.authProvider(provider)
  }

  async authProvider(provider: AuthProvider): Promise<UserCredential>{
    try {
      return await signInWithPopup(this.auth, provider)
    }catch (e){
      throw e
    }
  }
}
