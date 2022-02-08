import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  registerables,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';
import { GetUrl } from 'src/app/interfaces/url/get-url';
import { AlertsService } from 'src/app/services/alerts.service';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';
import { UrlsService } from 'src/app/services/urls/urls.service';
import { QrcodeModalComponent } from 'src/app/shared/qrcode-modal/qrcode-modal.component';

@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.scss']
})
export class ClientPanelComponent implements OnInit {
  
  chart: Chart;
  urlList: GetUrl[] = [{
    id_url: -1,
    id_user: -1,
    name_url: '',
    created_in: 11111111111,
    main_url: '',
    short_url: '',
    tags: '',
    qr_code: ''
  }];
  currentSelectedUrl: number; 
  
  @Input() qrCodeUrl;

  constructor(
    public componentToggler: ComponentTogglerService, 
    private _urls: UrlsService,
    private _alert: AlertsService
  ) {
    Chart.register(...registerables);
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
  }

  ngOnInit(): void {
    this.generateChart();

    this._urls.getUrlList().subscribe(
      (data: GetUrl[]) => {
        console.log('data from service: ', data),
        this.urlList = data;
      },
      error => console.log(error)
    );
  }

  openQrCode(qrCodeURLToRedirect: string, name: string): void {
    console.log("asd", qrCodeURLToRedirect)
    console.log(name)
    
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

  selectTableUrl(tableUrlIndex: number): void {
    this.currentSelectedUrl = tableUrlIndex;

    console.log(this.urlList[this.currentSelectedUrl].short_url);
  }
  
  callAlertModal(): void {
    this._alert.alertModal = {
      success: true,
      message: 'Copied to clipboard!',
      code: 200
    }

    this.componentToggler.alertModal = true;
  }
}
