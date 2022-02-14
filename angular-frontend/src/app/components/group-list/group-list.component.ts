import {Component, OnDestroy, OnInit} from "@angular/core";
import {GroupService} from "../../services/group.service";
import {Subscription} from "rxjs";
import {Group} from "../../models/group.model";

@Component({
  selector: 'app-group-list',
  templateUrl: 'group-list.component.html',
  styleUrls: ['group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {
  private _groupSubscription!: Subscription;

  groups: Group[] = [];

  constructor(private _groupService: GroupService) {}

  ngOnInit() {
     this.groups = this._groupService.groups;
     this._groupSubscription = this._groupService.groupChangeListener
       .subscribe(groups => {
         this.groups = groups;
       });
  }

  ngOnDestroy() {
    this._groupSubscription.unsubscribe();
  }

  search(searchStr: string) {
    this._groupService.filterByName(searchStr.trim().toLowerCase());
  }
}
