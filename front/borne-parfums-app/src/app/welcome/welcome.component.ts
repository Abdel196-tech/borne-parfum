import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TRANSLATIONS } from '../i18n/translation'; // <-- ici, ../ pour remonter d’un niveau


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit {
  lang: 'fr' | 'en' | 'nl' = 'fr';

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  videos: string[] = ['assets/Pub1.mp4','assets/Pub2.mp4'];
  currentIndex = 0;

  constructor(private router: Router) {}

  get t() {
    return TRANSLATIONS[this.lang];
  }

  setLang(l: 'fr' | 'en' | 'nl') {
    this.lang = l; // quand on clique sur le drapeau
  }

  onStart() {
    this.router.navigate(['/menu'], { queryParams: { lang: this.lang } });
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
