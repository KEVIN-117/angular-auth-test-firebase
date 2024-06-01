import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {firebaseConfig} from "./firebase.config";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {getStorage, provideStorage } from '@angular/fire/storage';
import {environment} from "../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(
      () => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ]
};
