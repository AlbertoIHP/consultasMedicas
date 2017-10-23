import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicpacientesComponent } from './medicpacientes.component';

describe('MedicpacientesComponent', () => {
  let component: MedicpacientesComponent;
  let fixture: ComponentFixture<MedicpacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicpacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicpacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
