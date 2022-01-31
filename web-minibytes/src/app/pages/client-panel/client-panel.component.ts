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
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
  }

  ngOnInit(): void {
    this.generateChart();
  }

  generateChart(): void {
    this.chart = new Chart('canvas', {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Impressions",
            data: [12, 19, 3, 5, 2, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 5, 2, 3],
            backgroundColor: [
              "#2C3E50",
            ],
            borderColor: [
              "#2C3E50"
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
}
