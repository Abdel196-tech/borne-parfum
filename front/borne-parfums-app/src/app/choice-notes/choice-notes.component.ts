// choice-notes.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TRANSLATIONS } from '../i18n/translation3';
import { LanguageService } from '../services/language.service';
import { PerfumeService } from '../services/perfume.service'; 
import { availableNotes } from '../availableNotes';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-choice-notes',
  templateUrl: './choice-notes.component.html',
  styleUrls: ['./choice-notes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChoiceNotesComponent implements OnInit {
availableNotes = availableNotes;


  searchTerm: string = '';
  selectedNotes: string[] = [];
  maxNotes: number = 5;

  // Traductions
  lang: 'fr' | 'en' | 'nl' = 'fr';
  title!: string;
  subtitle!: string;
  availableTitle!: string;
  selectedTitle!: string;
  noSelectionText!: string;
  maxInfoText!: string;
  continueMsg!: string;
  continueBtnText!: string;
  // 🔹 Déclarer les variables pour les boutons Accueil et Retour
  homeBtnText!: string;
  backBtnText!: string;
  constructor(
    private router: Router, 
    private location: Location,
    private languageService: LanguageService,
    private perfumeService: PerfumeService 
  ) { }

  ngOnInit(): void {
    console.log("✅ availableNotes :", this.availableNotes);

    // S'abonner aux changements de langue
    this.languageService.currentLang$.subscribe(lang => {
      this.lang = lang;
      this.updateTranslations();
    });
  }
searchPlaceholder: string = '';
  updateTranslations(): void {
    const t = TRANSLATIONS[this.lang];
    this.title = t.choiceNotes?.mainTitle || 'Choisis tes notes';
    this.subtitle = t.choiceNotes?.subtitle || "T'as le droit qu'à 5 notes";
    this.availableTitle = t.choiceNotes?.available || 'Notes disponibles';
    this.selectedTitle = t.choiceNotes?.selected || 'Les notes sélectionnées';
    this.noSelectionText = t.choiceNotes?.noSelection || 'Pas de notes sélectionnées';
    this.maxInfoText = t.choiceNotes?.maxInfo || '5 notes maximum';
    this.continueMsg = t.choiceNotes?.continueMsg || 'Sélectionne au moins une note pour continuer';
    this.continueBtnText = t.choiceNotes?.continueBtn || 'Trouve mon parfum';
     // Texte des boutons Accueil et Retour
    this.homeBtnText = t.choiceNotes?.homeBtn || 'Accueil';
    this.backBtnText = t.choiceNotes?.backBtn || 'Retour';
    this.searchPlaceholder = t.choiceNotes?.searchPlaceholder;

    }
  getNoteName(key: string): string {
  const notes = TRANSLATIONS[this.lang].notes as Record<string, string>;
  return notes[key] || key;
  }

  goHome(): void {
  this.router.navigate(['/welcome']);
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
    console.log('Notes envoyées à lAPI:', this.selectedNotes);
    this.perfumeService.getRecommendations(this.selectedNotes)
      .subscribe({
        next: (res) => {
          console.log('Réponse API:', res);
          // Naviguer vers ResultComponent avec les recommandations
          this.router.navigate(['/result'], { state: { recommendations: res.recommendations } });
        },
        error: (err) => console.error('Erreur API:', err)
      });
  }
}
get filteredNotes() {
  const term = this.searchTerm.trim().toLowerCase();

  // si l'utilisateur n'a rien écrit → on montre tout
  if (!term) return this.availableNotes;

  // sinon on filtre selon le début du nom de la note
  return this.availableNotes.filter(note =>
    this.getNoteName(note.key).toLowerCase().startsWith(term)
  );
}

}
