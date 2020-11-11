import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrolleableComponent } from './scrolleable.component';

describe('ScrolleableComponent', () => {
  let component: ScrolleableComponent;
  let fixture: ComponentFixture<ScrolleableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrolleableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrolleableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
