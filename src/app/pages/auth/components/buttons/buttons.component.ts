import {Component, inject, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {GithubAuthProvider} from "@angular/fire/auth";

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {

  private _authService: AuthService = inject(AuthService)
  private _router: Router = inject(Router)

  @Input() isLogin:boolean = false;

  async action(provider: string){
    if (provider === 'google'){
      await this.loginWhitGoogle()
    } else if (provider === 'github'){
      await this.loginWhitGithub()
    }
  }

  async loginWhitGoogle(){
    try {
      const  res = await this._authService.googleAuth()
      await this._router.navigateByUrl('/dashboard')

      console.log(res.user)
      console.log(typeof res)
    }catch (e){
      console.error(e)
    }
  }

  async loginWhitGithub(){
    try {
      const  res = await this._authService.githubAuth()
      await this._router.navigateByUrl('/dashboard')
      console.log(res.user)
      console.log(typeof res)
    }catch (e){
      console.error(e)
    }
  }
}
