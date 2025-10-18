import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResultComponent {
  recommendations: any[] = [];
  selectedPerfume: any = null; // ✅ variable modal
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state || history.state; // ✅ fallback

    if (state && state['recommendations']) {
      this.recommendations = state['recommendations'];
      console.log('Recommandations reçues:', this.recommendations);
    } else {
      console.log('Aucune recommandation reçue');
    }
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
}
