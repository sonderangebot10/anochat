import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUsersWindowComponent } from './room-users-window.component';

describe('RoomUsersWindowComponent', () => {
  let component: RoomUsersWindowComponent;
  let fixture: ComponentFixture<RoomUsersWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomUsersWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUsersWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
