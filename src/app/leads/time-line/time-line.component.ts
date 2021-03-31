import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
  @Input() timelineData: TimelineData;

  constructor() { }

  ngOnInit(): void {}

  getColor(i) {
    const length = this.timelineData.array.length -1;
    if (this.timelineData.index === length &&
      this.timelineData.array[i] === 'lost') {
        return 'status lost'
      }
    if(this.timelineData.index >= i)
    return 'status complete ';
    else return 'status';
  }

}

export interface TimelineData {
  index: number;
  array: string[];
}
