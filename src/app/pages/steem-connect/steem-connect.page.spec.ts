import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteemConnectPage } from './steem-connect.page';

describe('SteemConnectPage', () => {
  let component: SteemConnectPage;
  let fixture: ComponentFixture<SteemConnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteemConnectPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteemConnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
