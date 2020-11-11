import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommingSoonPage } from './comming-soon.page';

describe('CommingSoonPage', () => {
  let component: CommingSoonPage;
  let fixture: ComponentFixture<CommingSoonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommingSoonPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommingSoonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
