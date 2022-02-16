import {Component, Input} from "@angular/core";
import {Group} from "../../../models/group.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Coin} from "../../../models/coin.model";

@Component({
  selector: 'app-group-card[group]',
  templateUrl: 'group-card.component.html',
  styleUrls: ['group-card.component.css']
})
export class GroupCardComponent {
  @Input() group!: Group;

  constructor(private _router: Router,
              private _route: ActivatedRoute) {}

  onSettingsClick(event: Event): void {
    event.stopPropagation();
    this._router.navigate(['settings', this.group.id],
      {
        relativeTo: this._route
      }
    );
  }

  onCoinClick(coin: Coin, event: Event) {
    event.stopPropagation();
    this._router.navigate(['coin', this.group.id, coin.id])
  }

  onCardClick() {
    this._router.navigate(['coin', this.group.id, this.group.coins[0].id])
  }
}
