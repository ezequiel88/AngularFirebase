import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private utils: UtilsService) {
    this.formRegister = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      whats: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      re_senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]
    })
  }

  ngOnInit(): void {

  }

  register() {
    if (this.formRegister.valid) {
      this.utils.activity.next(true)
      this.auth.register(this.formRegister.value)
        .then(() => {
          this.formRegister.reset()
          this.router.navigate(['/']).then(() => this.utils.activity.next(false))
        })
        .catch((error) => {
          console.log(error)
          if (error.code === 'auth/email-already-in-use') {
            this.utils.showSnackBar('O email informado já está em uso por outra conta!', '', 'center', 'bottom', 3000);
          } else {
            this.utils.showSnackBar('Erro ao efetuar o cadastro!', '', 'center', 'bottom', 3000);
          }
          this.utils.activity.next(false)
        })

    }
  }
}
