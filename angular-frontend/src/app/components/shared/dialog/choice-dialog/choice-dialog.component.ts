import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Dialog} from "../../../../shared/dialog-data/dialog";

@Component({
  selector: 'app-choice-dialog',
  templateUrl: 'choice-dialog.component.html'
})
export class ChoiceDialogComponent {
  constructor(public dialogRef: MatDialogRef<ChoiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dialog) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
