import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionCriterionsComponent } from './dimension-criterions.component';

describe('DimensionCriterionsComponent', () => {
  let component: DimensionCriterionsComponent;
  let fixture: ComponentFixture<DimensionCriterionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionCriterionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionCriterionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
