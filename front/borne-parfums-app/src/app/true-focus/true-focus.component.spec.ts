import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFocusComponent } from './true-focus.component';

describe('TrueFocusComponent', () => {
  let component: TrueFocusComponent;
  let fixture: ComponentFixture<TrueFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFocusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
