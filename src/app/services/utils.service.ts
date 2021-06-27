import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  activity: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _snackBar: MatSnackBar) { }

  showSnackBar(msg: string, txtBtn: string, hPos: MatSnackBarHorizontalPosition, vPos: MatSnackBarVerticalPosition, dur: number) {
    this._snackBar.open(msg, txtBtn, {
      horizontalPosition: hPos,
      verticalPosition: vPos,
      duration: dur,
    });
  }

  getActivity() {
    return this.activity.getValue()
  }
}
