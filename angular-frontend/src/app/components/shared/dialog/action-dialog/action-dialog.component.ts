import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActionDialog} from "../../../../shared/dialog-data/action-dialog";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-action-dialog',
  templateUrl: 'action-dialog.component.html',
  styleUrls: ['action-dialog.component.css']
})
export class ActionDialogComponent implements OnInit {
  actionForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ActionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public  data: ActionDialog) {}

  ngOnInit() {
    this._initForm();
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    if (this.actionForm.valid) {
      const values: {[s: string]: any} = {};
      for (const action of this.data.actions) {
        values[action.action] = this.actionForm.get(action.action)?.value ?? '';
      }
      this.dialogRef.close(values);
    }
  }

  get saveDisabled(): boolean {
    return this.actionForm.invalid;
  }

  private _initForm() {
    const controls: {[s: string]: AbstractControl}  = {};
    for (const action of this.data.actions) {
      controls[action.action] = new FormControl(null, action.required ? [Validators.required] : []);
    }
    this.actionForm = new FormGroup(controls);
  }
}
