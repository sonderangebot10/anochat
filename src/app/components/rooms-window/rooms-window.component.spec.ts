import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsWindowComponent } from './rooms-window.component';

describe('RoomsWindowComponent', () => {
  let component: RoomsWindowComponent;
  let fixture: ComponentFixture<RoomsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
