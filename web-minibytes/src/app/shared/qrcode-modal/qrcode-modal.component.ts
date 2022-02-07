import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ComponentTogglerService } from 'src/app/services/component-toggler.service';

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.component.html',
  styleUrls: ['./qrcode-modal.component.scss']
})
export class QrcodeModalComponent implements OnInit {

  constructor(private componentToggler: ComponentTogglerService) { }

  ngOnInit(): void {}

  closeModal(modal: HTMLElement): void {
    modal.classList.remove('slide-in-right');
    modal.classList.add('slide-out-left');

    setTimeout(() => {
      this.componentToggler.qrCodeModal = false;
    }, 500);
  }

  //#region download qrcode from url
  name = 'Name for the file';
  base64Image: any;

  downloadImage() {
    const imageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.youtube.com/watch?v=Y6Rd9ZQBVG0.png";

    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      const link = document.createElement("a");
      
      this.base64Image = "data:image/png;base64," + base64data;
      document.body.appendChild(link);

      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", `${this.name}.png`);
      link.click();
    });
  }

  getBase64ImageFromURL(url: string) { 
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      
      img.crossOrigin = "Anonymous";
      img.src = url;

      if(img.complete) {
        observer.next(this.getBase64Image(img));
        observer.complete();
        return;
      }
      
      img.onload = () => {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const dataURL: string = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  //#endregion download qrcode from url

}
