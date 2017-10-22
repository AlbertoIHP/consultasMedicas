import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditartipoComponent } from './editartipo.component';

describe('EditartipoComponent', () => {
  let component: EditartipoComponent;
  let fixture: ComponentFixture<EditartipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditartipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditartipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
