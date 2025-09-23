// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { ChoiceNotesComponent } from './choice-notes/choice-notes.component';
import { ChoiceParfumComponent } from './choice-parfum/choice-parfum.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MenuComponent,
    ChoiceNotesComponent,
    ChoiceParfumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
