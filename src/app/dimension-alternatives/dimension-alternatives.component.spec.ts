import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionAlternativesComponent } from './dimension-alternatives.component';

describe('DimensionAlternativesComponent', () => {
  let component: DimensionAlternativesComponent;
  let fixture: ComponentFixture<DimensionAlternativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionAlternativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionAlternativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
