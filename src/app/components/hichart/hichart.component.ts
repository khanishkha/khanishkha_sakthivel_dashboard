
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-hichart-chart',
  templateUrl: './hichart.component.html',
  styleUrls: ['./hichart.component.scss']
})
export class HichartComponent implements OnChanges {
  @Input() chartOptions!: Highcharts.Options;
  Highcharts: typeof Highcharts = Highcharts;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartOptions) {
      console.log('Chart options updated:', this.chartOptions);
      // Any additional logic to handle chart update can go here
    }
  }
}
