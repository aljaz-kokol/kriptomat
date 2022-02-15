import {Component, Input} from "@angular/core";
import {Group} from "../../../models/group.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-group-card[group]',
  templateUrl: 'group-card.component.html',
  styleUrls: ['group-card.component.css']
})
export class GroupCardComponent {
  @Input() group!: Group;

  constructor(private _router: Router,
              private _route: ActivatedRoute) {}

  onSettingsClick(): void {
    this._router.navigate(['settings', this.group.id],
      {
        relativeTo: this._route
      }
    );
  }
}
