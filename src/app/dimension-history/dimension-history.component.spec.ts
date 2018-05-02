import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionHistoryComponent } from './dimension-history.component';

describe('DimensionHistoryComponent', () => {
  let component: DimensionHistoryComponent;
  let fixture: ComponentFixture<DimensionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
