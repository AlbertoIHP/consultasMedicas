import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarusuarioComponent } from './editarusuario.component';

describe('EditarusuarioComponent', () => {
  let component: EditarusuarioComponent;
  let fixture: ComponentFixture<EditarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
