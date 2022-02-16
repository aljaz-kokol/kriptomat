import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {CoinService} from "../../coin.service";
import {GroupService} from "../../group.service";

@Injectable({ providedIn: 'root' })
export class CoinGroupDetailGuard implements CanActivate {
  constructor(private _coinService: CoinService,
              private _groupService: GroupService,
              private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean | UrlTree>(obs => {
      const groupId = route.paramMap.get('groupId') ?? '';
      this._groupService.fetchGroupById(groupId).subscribe({
        next: group => obs.next(true),
        error: err => obs.next(this._router.createUrlTree(['coin-list']))
      })
    })
  }
}
