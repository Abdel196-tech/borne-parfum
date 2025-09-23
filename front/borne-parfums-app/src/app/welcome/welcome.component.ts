import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TRANSLATIONS } from '../i18n/translation';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  videos: string[] = ['assets/Pub1.mp4', 'assets/Pub2.mp4'];
  currentIndex = 0;

  // On récupère la langue via le service
  lang: 'fr' | 'en' | 'nl' = 'fr';

  constructor(private router: Router, private languageService: LanguageService) {
    // On s'abonne aux changements de langue
    this.languageService.currentLang$.subscribe(l => this.lang = l);
  }

  get t() {
    return TRANSLATIONS[this.lang];
  }

  // Quand l'utilisateur clique sur un drapeau
  setLang(l: 'fr' | 'en' | 'nl') {
    this.languageService.setLanguage(l);
  }

  // Démarre l'expérience
  onStart() {
    this.router.navigate(['/menu']);
  }

  ngAfterViewInit() {
    const player = this.videoPlayer.nativeElement;

    const playVideo = (index: number) => {
      player.src = this.videos[index];
      player.currentTime = 0;
      player.play();
    };

    playVideo(this.currentIndex);

    player.addEventListener('ended', () => {
      this.currentIndex = (this.currentIndex + 1) % this.videos.length;
      playVideo(this.currentIndex);
    });
  }
}
