import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Produto.models';
import { CrudService } from 'src/app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertComponent } from '../modal-alert/modal-alert.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { UtilsService } from 'src/app/services/utils.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formProduct: FormGroup
  view: boolean = true
  matcher = new MyErrorStateMatcher()

  constructor(private formBuilder: FormBuilder, public crud: CrudService, public dialog: MatDialog, private utils: UtilsService) {

    this.formProduct = formBuilder.group({
      id: [''],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      preco: ['', Validators.compose([Validators.required])],
      qtde: [null, Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalAlertComponent, { restoreFocus: false });
    dialogRef.afterClosed().subscribe(() => null);
  }

  saveProduct() {
    if (this.formProduct.valid) {
      this.utils.activity.next(true)
      this.crud.save(this.formProduct.value)
        .then((res) => {
          this.formProduct.reset()
          this.view = true
          this.utils.activity.next(false)
          this.utils.showSnackBar('Produto cadastrado com sucesso!', '', 'end', 'bottom', 3000)
        })
        .catch((error) => {
          this.utils.activity.next(false)
          this.utils.showSnackBar('Erro ao cadastrar produto!', '', 'end', 'bottom', 3000)
          console.log(error)
        })
    } else {
      console.log("Todos os campos são obrigatórios!")
    }
  }

  edit(produto: Product) {
    this.formProduct.patchValue({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      qtde: produto.qtde
    })
  }

  deleteProduct(produto: Product) {

    const dialogRef = this.dialog.open(ModalAlertComponent, {
      //disableClose: true,
      width: '300px',
      data: { id: produto.id, nome: produto.nome },
      restoreFocus: false
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.utils.activity.next(true)
        this.crud.delete(res)
          .then((res) => {
            this.utils.activity.next(false)
            this.utils.showSnackBar('Produto excluído com sucesso!', '', 'end', 'bottom', 3000)
          })
          .catch((error) => {
            this.utils.activity.next(false)
            this.utils.showSnackBar('Erro ao excluir produto!', '', 'end', 'bottom', 3000)
            console.log(error)
          })
      }

    })
  }
}
