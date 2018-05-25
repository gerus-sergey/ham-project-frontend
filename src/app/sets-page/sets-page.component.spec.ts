import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsPageComponent } from './sets-page.component';

describe('SetsPageComponent', () => {
  let component: SetsPageComponent;
  let fixture: ComponentFixture<SetsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
