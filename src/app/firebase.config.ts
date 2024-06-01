
import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {EnvironmentProviders} from "@angular/core";

export const firebaseConfig: EnvironmentProviders = provideFirebaseApp(() => initializeApp(environment.firebase), provideAuth(() => getAuth()));
