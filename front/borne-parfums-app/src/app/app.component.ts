import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // corrigé
  standalone: true,
  imports: [RouterOutlet],           // seul RouterOutlet suffit
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'borne-parfums-app';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
