import {Component, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({ providedIn: 'root' })
export class PopupService {
  private _showChange = new Subject<boolean>();
  private _show: boolean = false;

  toggleShow(): void {
    this._show = !this._show;
    this._showChange.next(this._show);
  }

  close(): void {
    this._show = false;
    this._showChange.next(this._show);
  }

  get changeListener(): Observable<boolean> {
    return this._showChange.asObservable();
  }
}
