// result.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 🔹 Import obligatoire
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true,         // 🔹 Composant standalone
  imports: [CommonModule]   // 🔹 Nécessaire pour *ngFor, pipes, etc.
})
export class ResultComponent {
  recommendations: any[] = [];

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
}