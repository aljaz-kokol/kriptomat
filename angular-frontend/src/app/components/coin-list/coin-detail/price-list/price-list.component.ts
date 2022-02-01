import {Component, Input} from "@angular/core";
import {Price} from "../../../../models/price.model";

@Component({
  selector: 'app-price-list[prices]',
  templateUrl: 'price-list.component.html',
  styleUrls: ['price-list.component.css']
})
export class PriceListComponent {
  @Input() prices: Price[] = []
}
