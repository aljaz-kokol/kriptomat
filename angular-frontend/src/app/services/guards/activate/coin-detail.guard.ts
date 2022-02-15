import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {CoinService} from "../../coin.service";

@Injectable({ providedIn: 'root' })
export class CoinDetailGuard implements CanActivate {
  constructor(private _coinService: CoinService,
              private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const coinId = route.paramMap.get('id');
    if (coinId) {
      return new Observable<boolean | UrlTree>(obs => {
        this._coinService.getCoinById(coinId).subscribe({
          next: coin => obs.next(true),
          error: err => obs.next(this._router.createUrlTree(['coin-list']))
        })
      });
    }
    return this._router.createUrlTree(['coin-list']);
  }

}
