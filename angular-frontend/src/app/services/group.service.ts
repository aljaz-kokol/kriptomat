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

  fetchGroupById(groupId: string): Observable<Group> {
    return this._apiHttp.get<ApiGroup>(this._apiEndpoint.getGroupByIdEndpoint(groupId))
      .pipe(map(Group.fromApiGroup));
  }

  createGroup(name: string, coins: Coin[], note?: string): Observable<{message: string; group: Group}> {
    return this._apiHttp.post<{message: string; group: ApiGroup}>(this._apiEndpoint.getGroupListEndpoint(), {
      name: name,
      note: note ?? '',
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

  updateGroup(groupID: string, name: string, note: string, coins: string[]): Observable<Group> {
    return this._apiHttp.put<{message: string, group: ApiGroup }>(this._apiEndpoint.getGroupByIdEndpoint(groupID), {
      name: name,
      note: note,
      coins: coins
    })
      .pipe(map(data => Group.fromApiGroup(data.group)));
  }

  deleteGroup(groupId: string): Observable<void> {
    return this._apiHttp.delete(this._apiEndpoint.getGroupByIdEndpoint(groupId));
  }

  removeGroup(groupId: string) {
    const index = this._groups.findIndex(group => group.id == groupId);
    if (index >= 0) {
      this._groups.splice(index, 1);
      this._groupChange.next(this._groups)
    }
  }

  replaceGroup(groupId: string, group: Group) {
    const index = this._groups.findIndex(group => group.id == groupId);
    if (index >= 0) {
      this._groups[index] = group;
      this._groupChange.next(this._groups)
    }
  }

  get groups(): Group[] {
    return [...this._groups];
  }

  get groupChangeListener(): Observable<Group[]> {
    return this._groupChange.asObservable();
  }
}
