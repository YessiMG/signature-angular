import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperModule } from "ngx-image-cropper";

import { AppComponent } from './app.component';
import { WriteSignatureComponent } from './write-signature/write-signature.component';
import { ImageSignatureComponent } from './image-signature/image-signature.component';
import { FileDropperComponent } from './file-dropper/file-dropper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WriteSignatureComponent,
    ImageSignatureComponent,
    FileDropperComponent
  ],
  imports: [
    BrowserModule,
    ImageCropperModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
