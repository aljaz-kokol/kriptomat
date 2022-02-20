import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {PopupService} from "../../../../services/popup.service";
import {Coin} from "../../../../models/coin.model";
import {DialogService} from "../../../../services/dialog.service";
import {GroupService} from "../../../../services/group.service";

@Component({
  selector: 'app-group-add-dialog',
  templateUrl: 'group-add-dialog.component.html',
  styleUrls: ['group-add-dialog.component.css']
})
export class GroupAddDialogComponent implements OnInit {
  groupAddForm: FormGroup | null = null;
  savingData = false;

  private _addedCoins: Coin[] = [];

  constructor(private _dialogRef: MatDialogRef<GroupAddDialogComponent>,
              private _popupService: PopupService,
              private _dialogService: DialogService,
              private _groupService: GroupService) {}

  ngOnInit(): void {
    this.groupAddForm = new FormGroup({
      name: new FormControl(null, [ Validators.required ]),
      note: new FormControl(null),
      coins: new FormArray([])
    });
  }

  onAddCoin(): void {
    this._popupService.toggleShow();
  }

  get canSave(): boolean {
    return !!(this.groupAddForm?.valid && this.addedCoins.length >= 1);

  }

  addCoins(coins: Coin[]) {
    this._addedCoins.push(...coins);
    for (const coin of coins) {
      this.addedCoinsFormArray.controls.push(new FormGroup({
        id: new FormControl(coin.id),
        name: new FormControl(coin.name),
        image: new FormControl(coin.image),
      }));
    }
  }

  onRemoveCoin(index: number) {
    if (index >= 0 && index < this.addedCoinsFormArray.controls.length) {
      const name = this.addedCoinsFormArray.controls[index].get('name')?.value;
      this._dialogService.openChoiceDialog({
        title: 'Remove Coin',
        body: `Are you sure you want to remove ${name}?`
      }).subscribe(result => {
        if (result) {
          this.addedCoinsFormArray.controls.splice(index, 1);
          this._addedCoins.splice(index, 1);
        }
      })
    }
  }

  onReset() {
    this.addedCoinsFormArray.controls = [];
  }

  onSave() {
    if (this.canSave && !this._emptyInputs) {
      this.savingData = true;
      const name = this.groupAddForm?.get('name')?.value ?? '';
      const note = this.groupAddForm?.get('note')?.value ?? '';
      const coins = this._addedCoins;
      this._groupService.createGroup(name, coins, note)
        .subscribe({
          next: result => {
            this._groupService.addGroup(result.group);
            this._dialogRef.close(result.message);
          },
          error: err => this._dialogRef.close(err.message)
        })
    }
  }

  onDialogClose() {
    if (!this._emptyInputs) {
      this._dialogService.openChoiceDialog({
        title: 'Exit without saving',
        body: 'Are you sure you want to exit without saving?',
      }).subscribe(result => {
        if (result)
          this._dialogRef.close(false);
      })
    } else {
     this._dialogRef.close(false);
    }
  }

  get addedCoinsFormArray(): FormArray {
    return (this.groupAddForm?.get('coins') as FormArray);
  }

  get addedCoins(): string[] {
    return this.addedCoinsFormArray.controls.map(control => control.get('id')?.value);
  }

  private get _emptyInputs(): boolean {
    const name = this.groupAddForm?.get('name')?.value ?? '';
    const note = this.groupAddForm?.get('note')?.value ?? '';
    const coins = this.addedCoins ?? [];
    return (name == '' && note == '' && coins.length == 0);
  }
}
