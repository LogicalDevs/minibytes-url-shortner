import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { AlertModal } from 'src/app/interfaces/alert/alert-modal';
import { GetUrl } from 'src/app/interfaces/url/get-url';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';
import { UrlsService } from 'src/app/services/urls/urls.service';

@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.scss']
})
export class ClientPanelComponent implements OnInit {
  
  chart: Chart;
  urlList: GetUrl[];
  currentSelectedUrl: number; 
  
  @Input() alertModal: AlertModal; 
  @Input() qrCodeUrl;

  constructor(public componentToggler: ComponentTogglerService, private _urls: UrlsService) {
    Chart.register(...registerables);
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
  }

  ngOnInit(): void {
    this.generateChart();

    this._urls.getUrlList().subscribe(
      (data: GetUrl[]) => {
        console.log('data from service: ', data),
        this.urlList = data
      },
      error => console.log(error)
    );
  }

  openQrCode(qrCodeURLToRedirect: string, name: string): void {
    this.qrCodeUrl = {
      url: qrCodeURLToRedirect,
      name
    } 
    this.componentToggler.qrCodeModal = true;
  }

  generateChart(): void {
    this.chart = new Chart('canvas', {
      type: "bar",
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        datasets: [
          {
            label: "Impressions",
            data: [12, 19, 3, 5, 2, 3, 5, 12, 19, 3, 5, 2, 3, 5],
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

  selectTableUrl(tableUrlIndex): void {
    console.log(tableUrlIndex);
    this.currentSelectedUrl = tableUrlIndex;
  }

  callAlertModal(): void {
    this.alertModal = {
      success: true,
      message: 'Copied to clipboard!',
      code: 200
    }

    this.componentToggler.alertModal = true;
    console.log("hello")
  }
}
