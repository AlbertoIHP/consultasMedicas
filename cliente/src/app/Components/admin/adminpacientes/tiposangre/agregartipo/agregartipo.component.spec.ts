import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregartipoComponent } from './agregartipo.component';

describe('AgregartipoComponent', () => {
  let component: AgregartipoComponent;
  let fixture: ComponentFixture<AgregartipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregartipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregartipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
