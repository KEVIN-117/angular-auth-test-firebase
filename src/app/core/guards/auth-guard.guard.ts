import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs";

export const routerInject = ()=> inject(Router)
export const authState$ = ()=> inject(AuthService).authState

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = routerInject()
  return authState$().pipe(
    map(user => {
      if (!user){
        router.navigateByUrl('/auth/log-in').then()
        return false
      }
      return true
    })
  );
};

export const publicGuardGuard: CanActivateFn = (route, state) => {
  const router = routerInject()

  return authState$().pipe(
    map(user => {
      if (user){
        router.navigateByUrl('/dashboard').then()
        return false
      }
      return true
    })
  );
}
