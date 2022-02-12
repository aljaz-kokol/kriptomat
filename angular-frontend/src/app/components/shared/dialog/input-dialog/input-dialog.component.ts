import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActionDialogContent} from "../../../../shared/dialog-data/action-dialog-contnet";

@Component({
  selector: 'app-input-dialog',
  templateUrl: 'input-dialog.component.html'
})
export class InputDialogComponent {
  inputString: string = '';

  constructor(public dialogRef: MatDialogRef<InputDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public  data: ActionDialogContent) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    const formattedString = this.inputString.trim().toLowerCase()
    if (formattedString)
      this.dialogRef.close(this.inputString.trim().toLowerCase());
  }

  get saveDisabled(): boolean {
    const formattedString = this.inputString.trim().toLowerCase()
    return formattedString.length <= 0;
  }
}
