import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployPage } from './deploy.page';

describe('DeployPage', () => {
  let component: DeployPage;
  let fixture: ComponentFixture<DeployPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
