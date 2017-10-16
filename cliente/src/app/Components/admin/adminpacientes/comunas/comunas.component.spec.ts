import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunasComponent } from './comunas.component';

describe('ComunasComponent', () => {
  let component: ComunasComponent;
  let fixture: ComponentFixture<ComunasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
