import { environment } from './../../../environments/environment';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit, OnChanges {
  @Input() statusArray = [];
  @Input() activeStatus;
  convertedStatusArray;
  activeStatusIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.convertedStatusArray = [...this.statusArray]
    const length = this.convertedStatusArray.length;
    this.convertedStatusArray[length - 2] = this.convertedStatusArray[length - 2] + '/' + this.convertedStatusArray[length - 1]
    this.convertedStatusArray.pop()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeStatus || changes.statusArray) {
      this.activeStatusIndex = this.statusArray.indexOf(this.activeStatus)
    }
  }

  // getData(i) {
  //   if (i < this.convertedStatusArray.length - 1) {
  //     return this.convertedStatusArray[i];
  //   }
  //   if (this.timelineData === 'won' || this.timelineData === 'lost') {
  //     return this.timelineData
  //   } else {
  //     const length = this.convertedStatusArray.length;
  //     return this.convertedStatusArray[length - 1];
  //   }
  // }

}


