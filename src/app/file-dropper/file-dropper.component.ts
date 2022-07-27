import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-dropper',
  templateUrl: './file-dropper.component.html',
  styleUrls: ['./file-dropper.component.css']
})
export class FileDropperComponent implements OnInit {

  file!: File;
  imageBase64: string = "";
  isImage = false;

  @Output() image = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  uploadImage(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
    }
    this.convertToBase64(this.file);
  }

  convertToBase64(file: File){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        if (reader.result)
        this.imageBase64 = reader.result?.toString();
        this.isImage = true;
        this.image.emit(this.imageBase64);
    };
  }
}
