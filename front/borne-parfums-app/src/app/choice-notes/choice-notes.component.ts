// choice-notes.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-choice-notes',
  templateUrl: './choice-notes.component.html',
  styleUrls: ['./choice-notes.component.css'],
  standalone: true,
  imports: [CommonModule]   // <-- obligatoire pour ngIf et ngFor
})
export class ChoiceNotesComponent implements OnInit {

  // Liste des notes disponibles avec leurs images
  availableNotes = [
    { name: 'Rose', img: 'assets/rose.png' },
    { name: 'Jasmine', img: 'assets/jasmine.png' },
    { name: 'Bergamot', img: 'assets/bergamote.png' },
    { name: 'Lemon', img: 'assets/citron.png' },
    { name: 'Sandalwood', img: 'assets/santal.png' },
    { name: 'Cedar', img: 'assets/cedre.png' },
    { name: 'Vanilla', img: 'assets/vanille.png' },
    { name: 'Amber', img: 'assets/amber.png' },
    { name: 'Mint', img: 'assets/menthe.png' },
    { name: 'Marine', img: 'assets/marine.png' },
    { name: 'Apple', img: 'assets/pomme.png' },
    { name: 'Peach', img: 'assets/peche.png' }
  ];

  selectedNotes: string[] = [];
  maxNotes: number = 5;

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {  console.log("✅ availableNotes :", this.availableNotes);
 }

  goBack(): void {
    this.location.back();
  }

  isSelected(note: string): boolean {
    return this.selectedNotes.includes(note);
  }

  toggleNote(note: string): void {
    if (this.isSelected(note)) {
      this.removeNote(note);
    } else {
      this.addNote(note);
    }
  }

  addNote(note: string): void {
    if (this.selectedNotes.length < this.maxNotes && !this.isSelected(note)) {
      this.selectedNotes.push(note);
    }
  }

  removeNote(note: string): void {
    const index = this.selectedNotes.indexOf(note);
    if (index > -1) {
      this.selectedNotes.splice(index, 1);
    }
  }

  searchPerfumes(): void {
    if (this.selectedNotes.length > 0) {
      this.router.navigate(['/perfume-results'], {
        queryParams: { notes: this.selectedNotes.join(',') }
      });
    }
  }
}