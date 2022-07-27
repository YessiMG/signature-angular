import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteSignatureComponent } from './write-signature.component';

describe('WriteSignatureComponent', () => {
  let component: WriteSignatureComponent;
  let fixture: ComponentFixture<WriteSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteSignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
