import {Component, OnInit} from "@angular/core";
import {GroupService} from "../../../services/group.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../../models/group.model";
import {ActivatedRoute, Router, UrlTree} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {PopupService} from "../../../services/popup.service";
import {Coin} from "../../../models/coin.model";
import {DeactivateComponent} from "../../../services/guards/deactivate/deactivate.guard";
import {Observable} from "rxjs";

@Component({
  selector: 'app-group-settings',
  templateUrl: 'group-settings.component.html',
  styleUrls: ['group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit, DeactivateComponent {
  groupSettingsForm: FormGroup | null = null;
  group: Group | null = null;
  isSaving: boolean = false;
  isDeleting: boolean = false;

  constructor(private _groupService: GroupService,
              private _route: ActivatedRoute,
              private _dialogService: DialogService,
              private _popupServe: PopupService,
              private _router: Router) {}

  ngOnInit() {
    this._route.paramMap.subscribe(urlMap => {
      const groupId = urlMap.get('id');
      if (groupId) {
        this._groupService.fetchGroupById(groupId).subscribe(group => {
          this.group = group;
          this._intiForm(this.group);
        });
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.canReset) {
      return this._dialogService.openChoiceDialog({
        title: 'Exit without saving',
        body: 'Are you sure you want to exit without saving changes made to group'
      });
    }
    return true;
  }

  onRemoveCoin(index: number) {
    if (this.coinsFormArray) {
     if (index >= 0 && index < this.coinsFormArray.controls.length) {
       const name = this.coinsFormArray.controls[index].get('name')?.value ?? '';
       this._dialogService.openChoiceDialog({
         title: 'Remove coin',
         body: `Are you sure you want to remove ${name} from group?`
       }).subscribe(result => {
         if (result) {
           this.coinsFormArray?.controls.splice(index, 1);
         }
       })
     }
    }
  }

  addCoinControls(coins: Coin[]) {
    if (this.coinsFormArray) {
      for (const coin of coins) {
        this.coinsFormArray.controls.push(new FormGroup({
          name: new FormControl(coin.name),
          image: new FormControl(coin.image),
          id: new FormControl(coin.id)
        }));
      }
    }
  }

  onShowCoinsPopup() {
    this._popupServe.toggleShow();
  }

  onSave() {
    if (this.canSave) {
      this._dialogService.openChoiceDialog({
        title: 'Saving',
        body: 'Are you sure you want to save changes?'
      }).subscribe(result => {
        if (result && this.group) {
          const name = this.groupSettingsForm?.get('name')?.value ?? '';
          const note = this.groupSettingsForm?.get('note')?.value ?? '';
          const coins = this.coinsFromFormArray;
          this.isSaving = true;
          this._groupService.updateGroup(this.group.id, name, note, coins).subscribe(group => {
            this._groupService.replaceGroup(group.id, group);
            this.group = group;
            this._intiForm(group);
            this.isSaving = false;
          });
        }
      });
    }
  }

  onDelete() {
    if (this.group) {
      this._dialogService.openInputConfirmDialog({
        title: 'Delete group',
        body: `This action cannot be undone. This will permanently delete the "${this.group.name}" group!`,
        confirmWord: this.group.name,
        confirmButtonText: `Delete this group`
      }).subscribe(result => {
        if (result && this.group) {
          this.isDeleting = true;
          this._groupService.deleteGroup(this.group.id).subscribe(() => {
            this._groupService.removeGroup(this.group?.id ?? '');
            this._router.navigate(['..', '..'], {relativeTo: this._route});
            this.isDeleting = false;
          });
        }
      });
    }
  }

  onReset() {
    if (this.group)
      this._intiForm(this.group)
  }

  get nameControlError(): string | null {
    const errors = this.groupSettingsForm?.get('name')?.errors;
    if (errors) {
      if (errors['nameExists'])
        return 'Group with this name already exists';
      return 'Please input a valid name';
    }
    return null;
  }

  get coinsFormArray(): FormArray | null {
    return (this.groupSettingsForm?.get('coins') as FormArray);
  }

  get coinsFromFormArray(): string[] {
    if (this.coinsFormArray?.controls) {
      const coinIds: string[] = [];
      for (const coinControl of this.coinsFormArray.controls) {
        const id = coinControl.get('id')?.value ?? '';
        if (id != '')
          coinIds.push(id);
      }
      return coinIds;
    }
    return [];
  }

  get canSave(): boolean {
    if (this.groupSettingsForm && this.group) {
      if (this.groupSettingsForm.valid && this.coinsFromFormArray.length > 0) {
       if (this._nameHasChanged || this._noteHasChanged || this._coinsHaveChanged)
        return true;
      }
    }
    return false;
  }

  get canReset(): boolean {
    if (!this.canSave && this.coinsFromFormArray.length <= 0)
      return true;
    return this.canSave;
  }

  private get _nameHasChanged() {
    if (this.group && this.groupSettingsForm) {
      const name = this.groupSettingsForm.get('name')?.value ?? '';
      if (name != '' && name.trim().toLowerCase() !== this.group.name)
        return true;
    }
    return false;
  }

  private get _noteHasChanged() {
    if (this.group && this.groupSettingsForm) {
      const note = this.groupSettingsForm.get('note')?.value ?? '';
      if (note.trim() != this.group.note.trim())
        return true;
    }
    return false;
  }

  private get _coinsHaveChanged() {
    const coinsFormArray = this.coinsFormArray;
    if (this.group && coinsFormArray) {
      if (coinsFormArray.controls.length != this.group.coins.length)
        return true;
      for (const coinControl of coinsFormArray.controls) {
        const id = coinControl.get('id')?.value ?? '';
        let matches = 0;
        for (const coin of this.group.coins) {
          if (id == coin.id)
            matches++;
        }
        if (id != '' && matches == 0)
          return true;
      }
    }
    return false;
  }

  private _intiForm(group: Group) {
    this.groupSettingsForm = new FormGroup({
      name: new FormControl(group.name, [ Validators.required, Validators.minLength(1), this._nameExistsValidator.bind(this) ]),
      note: new FormControl(group.note),
      coins: new FormArray([], [Validators.required])
    });
    for (const coin of group.coins) {
      (this.groupSettingsForm.get('coins') as FormArray).push(new FormGroup({
        name: new FormControl(coin.name, [Validators.required]),
        image: new FormControl(coin.image, [Validators.required]),
        id: new FormControl(coin.id, [Validators.required])
      }));
    }
  }

  private _nameExistsValidator(control: FormControl): {[s: string]: boolean} | null {
    const value = control.value.trim().toLowerCase();
    const index = this._groupService.groups.findIndex(group => group.name == value);
    if (index >= 0 && value != this.group?.name) {
      return {'nameExists': true};
    }
    return null
  }
}
