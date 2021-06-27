import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup
  hide: boolean = true;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private utils: UtilsService) {
    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]
    })
  }

  login() {
    if (this.formLogin.valid) {
      this.utils.activity.next(true)
      this.auth.login(this.formLogin.value)
        .pipe(
          take(1),
          catchError((error) => {
            console.log(error)
            if (error.code === 'auth/user-not-found') {
              this.utils.showSnackBar('Usuário não encontrado!', '', 'end', 'bottom', 3000);
            } else if (error.code === 'auth/wrong-password') {
              this.utils.showSnackBar('Senha incorreta!', '', 'end', 'bottom', 3000);
            } else {
              this.utils.showSnackBar('Erro ao recuperar suas crenciais!', '', 'end', 'bottom', 3000);
            }
            this.utils.activity.next(false)
            return EMPTY;
          }),
        )
        .subscribe(
          (response) => {
            this.formLogin.reset()
            this.router.navigate(['/'])
            this.utils.activity.next(false)
          }
        )
    }
  }
}
