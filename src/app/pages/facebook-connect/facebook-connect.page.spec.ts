import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookConnectPage } from './facebook-connect.page';

describe('FacebookConnectPage', () => {
  let component: FacebookConnectPage;
  let fixture: ComponentFixture<FacebookConnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookConnectPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookConnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
