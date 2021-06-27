import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})

export class ModalAlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  cancelar(): void {
    this.dialogRef.close(null);
  }

  ngOnInit(): void {
  }

}
