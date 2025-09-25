import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TRANSLATIONS } from '../i18n/translation4';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-choice-parfum',
  templateUrl: './choice-parfum.component.html',
  styleUrls: ['./choice-parfum.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]  // <-- FormsModule pour ngModel
})
export class ChoiceParfumComponent implements OnInit {

  // Langue actuelle
  lang: 'fr' | 'en' | 'nl' = 'fr';

  // Textes traduits
  backBtnText!: string;
  MidTexte!: string;
  LastTexte!: string;
  SearchPlaceholder!: string;

  // Variable pour ngModel
  searchTerm: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    console.log("ChoiceParfumComponent chargé avec succès !");

    // S'abonner aux changements de langue
    this.languageService.currentLang$.subscribe(lang => {
      this.lang = lang;
      this.updateTranslations();
    });
  }

  goBack(): void {
    this.location.back();
  }

  updateTranslations(): void {
    const t = TRANSLATIONS[this.lang];

    // Bouton Retour
    this.backBtnText = t.choiceParfum?.backBtn || 'Retour';

    // Texte du milieu (titre)
    this.MidTexte = t.choiceParfum?.mainTitle || 'Choisir un parfum par nom';

    // Texte bas (liste vide)
    this.LastTexte = t.choiceParfum?.noParfums || 'Liste des parfums disponibles';

    // Placeholder barre de recherche
    this.SearchPlaceholder = t.choiceParfum?.searchPlaceholder || 'Tapez le nom de votre parfum...';
  }
}
