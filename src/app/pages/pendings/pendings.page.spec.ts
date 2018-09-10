import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingsPage } from './pendings.page';

describe('PendingsPage', () => {
  let component: PendingsPage;
  let fixture: ComponentFixture<PendingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
