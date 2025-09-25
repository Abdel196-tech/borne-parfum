// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TRANSLATIONS } from '../i18n/translation2';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  lang: 'fr' | 'en' | 'nl' = 'fr';
  welcomeText!: string;
  notesText!: string;
  nameText!: string;

  constructor(
    private router: Router,
    private location: Location,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // S'abonner aux changements de langue
    this.languageService.currentLang$.subscribe(lang => {
      this.lang = lang;
      this.updateTranslations();
    });
  }

  updateTranslations(): void {
    const t = TRANSLATIONS[this.lang];
    this.welcomeText = t.search?.welcome || 'Voulez-vous trouver votre parfum par :';
    this.notesText = t.search?.notes || 'Notes';
    this.nameText = t.search?.name || 'Nom du Parfum';
  }

  goBack(): void {
    this.location.back();
  }

  // Redirection vers la page de choix par Notes
  searchByNotes(): void {
    this.router.navigate(['/choice-notes']);
  }

  // Redirection vers la page de choix par Parfum (anciennement /search-by-name)
  goToParfum() {
    this.router.navigate(['/choice-parfum']);
  }
}



