import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Dialog} from "../shared/dialog-data/dialog";
import {Observable} from "rxjs";
import {ChoiceDialogComponent} from "../components/shared/dialog/choice-dialog/choice-dialog.component";
import {ActionDialogComponent} from "../components/shared/dialog/action-dialog/action-dialog.component";
import {ActionDialog} from "../shared/dialog-data/action-dialog";
import {InputConfirmDialog} from "../shared/dialog-data/input-confirm-dialog";
import {
  InputConfirmDialogComponent
} from "../components/shared/dialog/input-confirm-dialog/input-confirm-dialog.component";
import {GroupAddDialogComponent} from "../components/shared/dialog/group-add-dialog/group-add-dialog.component";

interface DialogConfig {
  disableClose?: boolean;
  width?: string;
  height?: string;
}

@Injectable({providedIn: 'root'})
export class DialogService {
  constructor(private _dialog: MatDialog) {}

  public openChoiceDialog(data: Dialog, config?: DialogConfig): Observable<boolean> {
    const dialogRef = this._dialog.open(ChoiceDialogComponent, {
      data: data,
      disableClose: config?.disableClose
    });
    return dialogRef.afterClosed();
  }

  public openInputDialog(data: ActionDialog, config?:  DialogConfig): Observable<false | {[s: string]: any}> {
    const dialogRef = this._dialog.open(ActionDialogComponent, {
      data: data,
      disableClose: config?.disableClose
    });
    return dialogRef.afterClosed();
  }

  public openInputConfirmDialog(data: InputConfirmDialog, config?:  DialogConfig): Observable<boolean> {
    const dialogRef = this._dialog.open(InputConfirmDialogComponent, {
      data: data,
      disableClose: config?.disableClose,
      width: config?.width
    });
    return dialogRef.afterClosed();
  }

  public openAddGroupDialog(config?:  DialogConfig): Observable<false | string> {
    const dialogRef = this._dialog.open(GroupAddDialogComponent,  {
      disableClose: config?.disableClose,
      width: config?.width
    });
    return dialogRef.afterClosed();
  }
}
