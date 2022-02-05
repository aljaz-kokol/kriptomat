import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from "@angular/core";
import {
  fromEvent,
  merge,
  of,
  Subscription,
  timer
} from "rxjs";
import {
  filter,
  map,
  switchMap
} from "rxjs/operators";


@Directive({
  selector: "[longClick]"
})
export class LongClickDirective implements OnDestroy {
  private _eventSubscribe: Subscription;
  threshold = 500;

  @Output()
  longClick = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const mousedown = fromEvent<MouseEvent>(elementRef.nativeElement, "mousedown").pipe(
      filter(event => event.button == 0),  // Only allow left button (Primary button)
      map((event) => true) // turn on threshold counter
    );
    const touchstart = fromEvent(elementRef.nativeElement, 'touchstart').pipe(map(() => true));
    const touchEnd = fromEvent(elementRef.nativeElement, 'touchend').pipe(map(() => false));
    const mouseup = fromEvent<MouseEvent>(window, "mouseup").pipe(
      filter(event => event.button == 0),  // Only allow left button (Primary button)
      map(() => false) // reset threshold counter
    );
    this._eventSubscribe = merge(mousedown, mouseup, touchstart, touchEnd)
      .pipe(
        switchMap(state =>
          state ? timer(this.threshold, 100) : of(null)
        ),
        // filter(value => value)
      )
      .subscribe(() => this.longClick.emit());
  }

  ngOnDestroy(): void {
    if (this._eventSubscribe) {
      this._eventSubscribe.unsubscribe();
    }
  }
}
