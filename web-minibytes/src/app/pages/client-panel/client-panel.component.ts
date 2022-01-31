import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  registerables,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';

@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.scss']
})
export class ClientPanelComponent implements OnInit {

  public chart: Chart;

  constructor() {
    Chart.register(...registerables);
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title,);
  }

  ngOnInit(): void {
    this.generateChart();
  }

  generateChart(): void {
    this.chart = new Chart('canvas', {
      type: "bar",
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        datasets: [
          {
            label: "Impressions",
            data: [12, 19, 3, 5, 2, 3, 5,12, 19, 3, 5, 2, 3, 5],
            backgroundColor: [
              "#2c3e50b9",
            ],
            borderColor: [
              "#39ecae"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  }

  @ViewChild('scrollableUrlStats') scrollableUrlStats: ElementRef

  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) this.scrollableUrlStats.nativeElement.scrollLeft += 40;
    else this.scrollableUrlStats.nativeElement.scrollLeft -= 40;
 } 
}
