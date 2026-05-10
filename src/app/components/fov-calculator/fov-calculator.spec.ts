import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FovCalculator } from './fov-calculator';

describe('FovCalculator', () => {
  let component: FovCalculator;
  let fixture: ComponentFixture<FovCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FovCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(FovCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
