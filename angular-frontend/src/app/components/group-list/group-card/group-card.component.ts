import {Component, Input} from "@angular/core";
import {Group} from "../../../models/group.model";

@Component({
  selector: 'app-group-card[group]',
  templateUrl: 'group-card.component.html',
  styleUrls: ['group-card.component.css']
})
export class GroupCardComponent {
  @Input() group!: Group;
}
