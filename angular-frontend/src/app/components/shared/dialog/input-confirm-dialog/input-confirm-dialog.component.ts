import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InputConfirmDialog} from "../../../../shared/dialog-data/input-confirm-dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-input-confirm-dialog',
  templateUrl: 'input-confirm-dialog.component.html',
  styleUrls: ['input-confirm-dialog.component.css']
})
export class InputConfirmDialogComponent implements OnInit {
  confirmForm!: FormGroup;

  constructor(private _dialogRef: MatDialogRef<InputConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: InputConfirmDialog) {}

  ngOnInit() {
    this.confirmForm = new FormGroup({
      confirmWord:  new FormControl(null, [Validators.required, this._inputEqualConfirmWord.bind(this)])
    });
  }

  private _inputEqualConfirmWord(control: FormControl): {[s: string]: boolean} | null {
      const value = control.value ?? '';
      if (value !== this.data.confirmWord.trim()) {
        return {'equalsConfirmWordError': true};
      }
      return null;
  }

  onConfirm() {
    this._dialogRef.close(true);
  }
}
