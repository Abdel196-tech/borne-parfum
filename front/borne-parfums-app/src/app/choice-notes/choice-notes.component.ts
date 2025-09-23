import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-choice-notes',
  templateUrl: './choice-notes.component.html',
  styleUrls: ['./choice-notes.component.css']
})
export class ChoiceNotesComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
