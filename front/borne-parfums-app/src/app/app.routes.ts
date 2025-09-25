import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChoiceNotesComponent } from './choice-notes/choice-notes.component';
import { ChoiceParfumComponent } from './choice-parfum/choice-parfum.component'; // Import your component
export const routes: Routes = [
    { path: 'home', component: WelcomeComponent, data: { animation: 'WelcomePage' } },
    { path: 'menu', component: MenuComponent, data: { animation: 'MenuPage' } },
    { path: 'choice-notes', component: ChoiceNotesComponent, data: { animation: 'ChoiceNotesPage' } },
    { path: 'choice-parfum', component: ChoiceParfumComponent , data: { animation: 'ChoiceParfumPage' }}, // <-- nouvelle route
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ];
