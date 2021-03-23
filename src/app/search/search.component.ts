import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  searchCriteria = '';
  @Output() searchcriteria = new EventEmitter<string>();
  private destroyed$ = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {
    // this.searchfilter = this.fb.control(null);
    // this.searchfilter.valueChanges
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe(value => {
    //     this.searchService.changeList(value)
    //   })
  }

  searchThis(event) {
    this.searchcriteria.emit(event);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}


