import {Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";

@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css']
})
export class SearchBarComponent {
  @ViewChild('searchBar', { static: false }) private _searchBar?: ElementRef;
  @Output('onSearch') private _onSearch: EventEmitter<string> = new EventEmitter<string>()

  onInput() {
    let searchStr = '';
    if (this._searchBar)
      searchStr = this._searchBar.nativeElement.value.trim().toLocaleLowerCase();
    this._onSearch.emit(searchStr)
  }
}
