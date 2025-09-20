import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceNotesComponent } from './choice-notes.component';

describe('ChoiceNotesComponent', () => {
  let component: ChoiceNotesComponent;
  let fixture: ComponentFixture<ChoiceNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
