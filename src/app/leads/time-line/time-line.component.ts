import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
  statusArray = environment.status;
  @Input() timelineData;
  convertedStatusArray;

  constructor() { }

  ngOnInit(): void {
      this.convertedStatusArray = [...this.statusArray]
      const length = this.convertedStatusArray.length;
      this.convertedStatusArray[length -2] = this.convertedStatusArray[length -2] + '/' + this.convertedStatusArray[length -1]
      this.convertedStatusArray.pop()
  }


  getData(i) {
    if (i < this.convertedStatusArray.length - 1) {
      return this.convertedStatusArray[i];
    } else {
      if (this.timelineData === 'won' || this.timelineData === 'lost') return this.timelineData
      const length = this.convertedStatusArray.length;
      return this.convertedStatusArray[length - 1];
    }
  }

}


