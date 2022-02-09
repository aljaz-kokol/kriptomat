import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogContent} from "../../../../shared/dialog-data/dialog-content";

@Component({
  selector: 'app-choice-dialog',
  templateUrl: 'choice-dialog.component.html'
})
export class ChoiceDialogComponent {
  constructor(public dialogRef: MatDialogRef<ChoiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogContent) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
