import {Component, Input} from "@angular/core";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.css']
})
export class SpinnerComponent {
  @Input() diameter = 100;
  @Input() color: ThemePalette = 'primary';
}
