import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { slideInAnimation } from './animation';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,WelcomeComponent,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation]

})
export class AppComponent {
  title = 'borne-parfums-app';
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
