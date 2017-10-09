import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientehomeComponent } from './pacientehome.component';

describe('PacientehomeComponent', () => {
  let component: PacientehomeComponent;
  let fixture: ComponentFixture<PacientehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientehomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
