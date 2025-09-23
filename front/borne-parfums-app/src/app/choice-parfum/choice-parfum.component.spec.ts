import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceParfumComponent } from './choice-parfum.component';

describe('ChoiceParfumComponent', () => {
  let component: ChoiceParfumComponent;
  let fixture: ComponentFixture<ChoiceParfumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceParfumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceParfumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
