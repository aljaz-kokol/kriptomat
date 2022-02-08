import {Component, OnDestroy, OnInit} from "@angular/core";
import {PopupService} from "../../../services/popup.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.css'],
})
export class PopupComponent implements OnInit, OnDestroy {
  private _changeSubscription!: Subscription;
  constructor(private _popupService: PopupService) {}
  show: boolean = false;

  ngOnInit(): void {
    this._changeSubscription = this._popupService.changeListener
      .subscribe(show => {
          this.show = show;
      });
  }

  ngOnDestroy(): void {
    this._changeSubscription.unsubscribe();
  }

  togglePopup(): void {
    this._popupService.toggleShow();
  }

  onPopupClicked(event: Event): void {
    event.stopPropagation();
  }
}
