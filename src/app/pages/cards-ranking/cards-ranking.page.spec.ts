import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsRankingPage } from './cards-ranking.page';

describe('CardsRankingPage', () => {
  let component: CardsRankingPage;
  let fixture: ComponentFixture<CardsRankingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsRankingPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsRankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
