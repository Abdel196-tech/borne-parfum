import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TRANSLATIONS } from '../i18n/translation5';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResultComponent implements OnInit {
  recommendations: any[] = [];
  selectedPerfume: any = null; // ✅ variable modal
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  
  // Langue actuelle
  lang: 'fr' | 'en' | 'nl' = 'fr';
  
  // Textes traduits
  backBtnText!: string;
  homeBtnText!: string;
  longevityText!: string;
  sillageText!: string;
  vitrineText!: string;
  similarityRankText!: string;
  viewProductText!: string;
  notesText!: string;
  topNotesText!: string;
  middleNotesText!: string;
  baseNotesText!: string;
  seeAccordsText!: string;
  accordsText!: string;
  backToNotesText!: string;
  closeText!: string;
  noRecommendationsText!: string;
  inStockText!: string;
  outOfStockText!: string;
  stockOutText!: string;
  
  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state || history.state; // ✅ fallback

    if (state && state['recommendations']) {
      this.recommendations = state['recommendations'];
      console.log('Recommandations reçues:', this.recommendations);
    } else {
      console.log('Aucune recommandation reçue');
    }

    // S'abonner aux changements de langue
    this.languageService.currentLang$.subscribe(lang => {
      this.lang = lang;
      this.updateTranslations();
    });
  }

  updateTranslations(): void {
    const t = TRANSLATIONS[this.lang];
    this.backBtnText = t.result?.backBtn || 'Retour';
    this.homeBtnText = t.result?.homeBtn || 'Accueil';
    this.longevityText = t.result?.longevity || 'Longévité';
    this.sillageText = t.result?.sillage || 'Sillage';
    this.vitrineText = t.result?.vitrine || 'Vitrine';
    this.similarityRankText = t.result?.similarityRank || 'Rang de similarité';
    this.viewProductText = t.result?.viewProduct || 'Voir le produit';
    this.notesText = t.result?.notes || 'Notes';
    this.topNotesText = t.result?.topNotes || 'Notes de tête';
    this.middleNotesText = t.result?.middleNotes || 'Notes de cœur';
    this.baseNotesText = t.result?.baseNotes || 'Notes de fond';
    this.seeAccordsText = t.result?.seeAccords || 'Voir les accords';
    this.accordsText = t.result?.accords || 'Accords';
    this.backToNotesText = t.result?.backToNotes || 'Retour aux notes';
    this.closeText = t.result?.close || 'Fermer';
    this.noRecommendationsText = t.result?.noRecommendations || 'Aucune recommandation disponible';
    this.inStockText = t.result?.inStock || 'En stock';
    this.outOfStockText = t.result?.outOfStock || 'Pas en stock';
    this.stockOutText = t.result?.stockOut || 'Non disponible';
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }

  goHome(): void {
    this.router.navigate(['/welcome']);
  }

  // ✅ Méthode pour encoder correctement les noms de fichiers
  encode(name: string): string {
    return encodeURIComponent(name);
  }

 
  parseAccords(raw: any): { name: string; value: number }[] {
  if (!raw) return [];

  // Si c'est déjà un tableau, on renvoie direct
  if (Array.isArray(raw)) {
    return raw;
  }

  // Nettoyage si c'est une string de style Python
  let str = raw.toString().trim();

  // Supprime les crochets au début/fin
  str = str.replace(/^\[|\]$/g, "");

  // Découpe par "), (" et par virgules
  const matches = str.match(/\('([^']+)',\s*([\d.]+)\)/g);

  if (!matches) return [];

  return matches.map((m: string) => {  // ✅ typage explicite de m
    const parts = /\('([^']+)',\s*([\d.]+)\)/.exec(m);
    return {
      name: parts ? parts[1] : "",
      value: parts ? parseFloat(parts[2]) : 0
    };
  });
  }

  getAccords(perfume: any) {
  return this.parseAccords(perfume?.Accords);
  }
  showNotes: boolean = false;

  openPerfume(p: any) {
  this.selectedPerfume = p;
  this.showNotes = true; // Toujours commencer sur la vue accords
}

  closePerfume() {
  this.selectedPerfume = null;
  this.showNotes = false;
}
  // ✅ AJOUT DES MÉTHODES SCROLL
  scrollRight() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({
        left: this.scrollContainer.nativeElement.offsetWidth,
        behavior: 'smooth'
      });
    }
  }

  scrollLeft() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({
        left: -this.scrollContainer.nativeElement.offsetWidth,
        behavior: 'smooth'
      });
    }
  }
  getNotesArray(noteString: string): string[] {
  if (!noteString) return [];
  return noteString.split(',').map(n => n.trim());
}

  // Méthode pour déterminer le statut du stock
  getStockStatus(perfume: any): 'in-stock' | 'out-of-stock' | 'stock-out' {
    const stock = perfume?.Stock;
    
    // Si Stock = "OUT" ou "NON DISPONIBLE" (string)
    if (stock === 'OUT' || stock === 'out' || stock === 'NON DISPONIBLE' || stock === 'non disponible' || stock === 'NON DISPON') {
      return 'stock-out';
    }
    
    // Si Stock = FALSE ou falsy (0, null, undefined, etc.)
    if (!stock || stock === false || stock === 'FALSE' || stock === 'false') {
      return 'out-of-stock';
    }
    
    // Si Stock = TRUE ou truthy
    return 'in-stock';
  }

  // Méthode pour obtenir le texte du statut
  getStockText(perfume: any): string {
    const status = this.getStockStatus(perfume);
    
    switch (status) {
      case 'in-stock':
        return this.inStockText;
      case 'out-of-stock':
        return this.outOfStockText;
      case 'stock-out':
        return this.stockOutText;
      default:
        return this.outOfStockText;
    }
  }
}
