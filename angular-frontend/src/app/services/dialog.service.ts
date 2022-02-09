import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DialogContent} from "../shared/dialog-data/dialog-content";
import {Observable} from "rxjs";
import {ChoiceDialogComponent} from "../components/shared/dialog/choice-dialog/choice-dialog.component";

@Injectable({providedIn: 'root'})
export class DialogService {
  constructor(private _dialog: MatDialog) {}

  public operChoiceDialog(data: DialogContent, config?: {disableClose?: boolean}): Observable<boolean> {
    const dialogRef = this._dialog.open(ChoiceDialogComponent, {
      data: data,
      disableClose: config?.disableClose
    })
    return dialogRef.afterClosed();
  }
}
