import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsPage } from './albums.page';

describe('AlbumsPage', () => {
  let component: AlbumsPage;
  let fixture: ComponentFixture<AlbumsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
