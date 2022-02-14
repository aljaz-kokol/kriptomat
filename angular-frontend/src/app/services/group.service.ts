import {Inject, Injectable} from "@angular/core";
import {ApiHttpService} from "./core/api-http.service";
import {ApiEndpointService} from "./core/api-endpoint.service";
import {Coin} from "../models/coin.model";
import {map, Observable, Subject} from "rxjs";
import {ApiGroup, Group} from "../models/group.model";

@Injectable({ providedIn: 'root' })
export class GroupService {
  private _groupChange = new Subject<Group[]>();
  private _groups: Group[] = [];
  constructor(private _apiHttp: ApiHttpService,
              private _apiEndpoint: ApiEndpointService) {
    this.fetchGroups().subscribe(groups => {
      this._groups = groups;
      this._groupChange.next(this._groups);
    });
  }

  fetchGroups(): Observable<Group[]> {
    return this._apiHttp.get<ApiGroup[]>(this._apiEndpoint.getGroupListEndpoint())
      .pipe(map(Group.fromApiGroupList));
  }

  createGroup(name: string, coins: Coin[]): Observable<{message: string; group: Group}> {
    return this._apiHttp.post<{message: string; group: ApiGroup}>(this._apiEndpoint.getGroupListEndpoint(), {
      name: name,
      coins: coins.map(coin => coin.id)
    })
      .pipe(map(data => {
        const group = Group.fromApiGroup(data.group);
        return {message: data.message, group: group}
      }));
  }

  filterByName(filterStr: string): void {
    const formattedStr = filterStr.trim().toLowerCase();
    this._groupChange.next(this.groups.filter(group => group.name.trim().toLowerCase().indexOf(formattedStr) >= 0))
  }

  addGroup(group: Group) {
    this._groups.push(group);
    this._groupChange.next(this.groups);
  }

  get groups(): Group[] {
    return [...this._groups];
  }

  get groupChangeListener(): Observable<Group[]> {
    return this._groupChange.asObservable();
  }
}
