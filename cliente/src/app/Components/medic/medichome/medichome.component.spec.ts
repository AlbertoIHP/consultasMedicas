import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedichomeComponent } from './medichome.component';

describe('MedichomeComponent', () => {
  let component: MedichomeComponent;
  let fixture: ComponentFixture<MedichomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedichomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedichomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
