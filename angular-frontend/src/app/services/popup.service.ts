import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class PopupService {
  private _showChange = new Subject<boolean>();
  private _show: boolean = false;

  toggleShow(): void {
    this._show = !this._show;
    this._showChange.next(this._show);
  }

  get changeListener(): Observable<boolean> {
    return this._showChange.asObservable();
  }
}
