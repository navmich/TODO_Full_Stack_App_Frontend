import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondWelcomeComponent } from './second-welcome.component';

describe('SecondWelcomeComponent', () => {
  let component: SecondWelcomeComponent;
  let fixture: ComponentFixture<SecondWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
