import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-write-signature',
  templateUrl: './write-signature.component.html',
  styleUrls: ['./write-signature.component.css']
})
export class WriteSignatureComponent implements OnInit, AfterViewInit {

  @ViewChild('signature', {static: true}) signaturePadElement: any;
  signaturePad: any;
  signatureImage: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
      minWidth: 1,
      maxWidth: 2,
  })
  }

  ngOnInit(): void {
  }

  cleanSignature(){
    this.signaturePad.clear();
  }

  undoSignature(){
    const data = this.signaturePad.toData();
    if (data){
      data.pop();
      this.signaturePad.fromData(data);
    }
  }

  downloadSignature(dataUrl: any, name: any){
    if(navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1){
      window.open(dataUrl);
    }
    else {
      const blob = this.urlToBlob(dataUrl);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      this.signatureImage = blob;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  urlToBlob(dataUrl: any){
    //pasar la imagen a texto
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawL = raw.length;
    const array = new Uint8Array(rawL);
    for (let i = 0; i < rawL; i++){
      array[i] = raw.charCodeAt(i);
    }
    return new Blob([array], {type: contentType});
  }

  save(){
    if(this.signaturePad.isEmpty()){
      alert('Escriba su firma');
    } else {
      const u = this.signaturePad.toDataURL();
      this.downloadSignature(u, 'firma.png');
      this.signatureImage = u;
    }
  }
}
