import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-signature',
  templateUrl: './image-signature.component.html',
  styleUrls: ['./image-signature.component.css']
})
export class ImageSignatureComponent implements OnInit {

  @ViewChild('signature', { static: false }) signatureCanvas: ElementRef = {} as ElementRef;
  ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  imgBase64: string = "";
  cropImgPreview: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  async removeBackgroundImage(image: string) {
    let canvas = this.signatureCanvas.nativeElement;
    this.ctx = canvas.getContext("2d");
    let imageCopy: HTMLImageElement = await this.loadImage(image);
    canvas.style.width = "500px";
    canvas.height = imageCopy.height;
    canvas.width = imageCopy.width;
    this.ctx.drawImage(imageCopy, 0, 0);
    console.log(this.ctx);
    let imgd = this.ctx.getImageData(0, 0, canvas.width, canvas.height),
      pix = imgd.data,
      newColor = { r: 0, g: 0, b: 0, a: 0 };

    for (let i = 0, n = pix.length; i < n; i += 4) {
      let grey = (pix[i] + pix[i + 1] + pix[i + 2]) / 3;
      pix[i] = grey;
      pix[i + 1] = grey;
      pix[i + 2] = grey;
      let r = pix[i], g = pix[i + 1], b = pix[i + 2];
      pix[i] = newColor.r;
      pix[i + 1] = newColor.g;
      pix[i + 2] = newColor.b;
      if (r >= 150 && g >= 150 && b >= 150) {
        pix[i + 3] = newColor.a;
      }
    }
    this.ctx.putImageData(imgd, 0, 0);
  }

  async imageToCanvas(image: string) {
    let canvas = this.signatureCanvas.nativeElement;
    this.ctx = canvas.getContext("2d");
    let imageCopy: HTMLImageElement = await this.loadImage(image);
    canvas.style.width = "auto";
    canvas.height = imageCopy.height;
    canvas.width = imageCopy.width;
    this.ctx.drawImage(imageCopy, 0, 0);
    let imgd = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    this.ctx.putImageData(imgd, 0, 0);
  }

  async loadImage(src: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.src = src;
    return new Promise(resolve => {
      image.onload = (ev) => {
        resolve(image);
      }
    });
  }

  cutImage() {
    let urlImage = this.signatureCanvas.nativeElement.toDataURL();
    this.imgBase64 = urlImage;
  }

  save() {
    this.imageToCanvas(this.cropImgPreview);
  }

  download(){
    let urlImage = this.signatureCanvas.nativeElement.toDataURL();
    this.downloadSignature(urlImage, 'firma.png');
  }

  downloadSignature(dataUrl: any, name: any) {
    if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      window.open(dataUrl);
    }
    else {
      const blob = this.urlToBlob(dataUrl);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  urlToBlob(dataUrl: any) {
    //pasar la imagen a texto
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawL = raw.length;
    const array = new Uint8Array(rawL);
    for (let i = 0; i < rawL; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return new Blob([array], { type: contentType });
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
}
imgLoad() {
  // display cropper tool
}
initCropper() {
  // init cropper
}

imgFailed() {
  // error msg
}
}
