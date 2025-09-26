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
import { ResultComponent } from './result/result.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MenuComponent,
    ChoiceParfumComponent,
    ChoiceNotesComponent,
    ResultComponent
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
