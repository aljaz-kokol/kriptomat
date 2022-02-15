import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GroupService} from "../../group.service";

@Injectable({ providedIn: 'root' })
export class GroupSettingsGuard implements CanActivate {
  constructor(private _groupService: GroupService,
              private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const groupId = route.paramMap.get('id');
    if (groupId) {
      return new Observable<boolean | UrlTree>(obs => {
        this._groupService.fetchGroupById(groupId).subscribe({
          next: group => obs.next(true),
          error: err => obs.next(this._router.createUrlTree(['groups']))
        })
      });
    }
    return this._router.createUrlTree(['groups']);
  }
}
