import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPrpductsComponent } from './all-prpducts.component';

describe('AllPrpductsComponent', () => {
  let component: AllPrpductsComponent;
  let fixture: ComponentFixture<AllPrpductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPrpductsComponent]
    });
    fixture = TestBed.createComponent(AllPrpductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
