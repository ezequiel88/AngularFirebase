import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { CrudService } from './services/crud.service';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { MatMenuModule } from '@angular/material/menu';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { RegisterComponent } from './components/register/register.component';

import { NgxCurrencyModule } from "ngx-currency";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroComponent,
    LoginComponent,
    RegisterComponent,
    RedefinirSenhaComponent,
    ModalAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatInputModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    CrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
