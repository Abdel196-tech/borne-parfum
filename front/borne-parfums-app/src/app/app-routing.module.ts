import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { ChoiceNotesComponent } from './choice-notes/choice-notes.component'; // <-- import du nouveau composant

const routes: Routes = [
  { path: '', component: WelcomeComponent },      // page d'accueil
  { path: 'menu', component: MenuComponent },     // menu
  { path: 'choice-notes', component: ChoiceNotesComponent }, // nouvelle page choix notes
  { path: '**', redirectTo: '' } // redirection pour toute route inconnue vers accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
