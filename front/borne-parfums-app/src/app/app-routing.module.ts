// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { ChoiceNotesComponent } from './choice-notes/choice-notes.component'; // <-- import du nouveau composant
import { ChoiceParfumComponent } from './choice-parfum/choice-parfum.component'; // <-- import du nouveau composant
const routes: Routes = [
  { path: '', component: WelcomeComponent },      // page d'accueil
  { path: 'menu', component: MenuComponent },     // menu
  { path: 'choice-notes', component: ChoiceNotesComponent }, // nouvelle page choix notes
  { path: 'choice-parfum', component: ChoiceParfumComponent }, // <-- nouvelle route
  { path: '**', redirectTo: '' } // redirection pour toute route inconnue vers accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
