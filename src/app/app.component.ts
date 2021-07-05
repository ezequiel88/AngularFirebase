import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { AuthService } from './services/auth.service';
import { CrudService } from './services/crud.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'SisCad';

  menu: Array<any> = [
    { label: 'Home', icon: 'home', url: 'home' },
    { label: 'Cadastro', icon: 'inventory_2', url: 'cadastro' }
  ]

  hasBackdrop: boolean = true;
  mode: MatDrawerMode = 'over'; // 'side', 'over', 'push'

  constructor(public auth: AuthService, public crud: CrudService, public utils: UtilsService, private router: Router, public dialog: MatDialog) {

  }



  logout() {

    const dialogRef = this.dialog.open(ModalAlertComponent, {
      //disableClose: true,
      width: '300px',
      data: { action: true },
      restoreFocus: false
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.utils.activity.next(true)
        this.auth.logout()
          .pipe(
            take(1),
            catchError((error) => {
              console.log(error)
              this.utils.showSnackBar('Erro ao fazer logout!', '', 'end', 'bottom', 3000)
              this.utils.activity.next(false)
              return EMPTY;
            }),
          )
          .subscribe(() => {
            this.router.navigate(['login'])
            this.utils.activity.next(false)
          })
      }
    })

  }
}
