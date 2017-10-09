import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryhomeComponent } from './secretaryhome.component';

describe('SecretaryhomeComponent', () => {
  let component: SecretaryhomeComponent;
  let fixture: ComponentFixture<SecretaryhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaryhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
