import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionResultComponent } from './dimension-result.component';

describe('DimensionResultComponent', () => {
  let component: DimensionResultComponent;
  let fixture: ComponentFixture<DimensionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
