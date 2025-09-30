// perfume.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfumeService {
  private apiUrl = 'http://localhost:8000';
 // URL de ton backend FastAPI

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les recommandations
getRecommendations(notes: string[]): Observable<any> {
  return this.http.post(`${this.apiUrl}/recommend`, { notes });
}


}
