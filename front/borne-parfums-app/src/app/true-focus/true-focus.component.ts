import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-true-focus',
  templateUrl: './true-focus.component.html',
  styleUrls: ['./true-focus.component.css']
})
export class TrueFocusComponent implements OnInit, OnDestroy {
  @Input() sentence: string = 'True Focus';
  @Input() blurAmount: number = 5;
  @Input() borderColor: string = 'red';
  @Input() glowColor: string = 'rgba(255,0,0,0.6)';
  @Input() animationDuration: number = 0.5;
  @Input() pauseBetweenAnimations: number = 1;

  words: string[] = [];
  currentIndex: number = 0;
  intervalId: any;

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  wordRefs: HTMLElement[] = [];
  focusRect: FocusRect = { x: 0, y: 0, width: 0, height: 0 };

  ngOnInit(): void {
    this.words = this.sentence.split(' ');

    // cycle automatique
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.updateFocusRect();
    }, (this.animationDuration + this.pauseBetweenAnimations) * 1000);

    // calcul initial
    setTimeout(() => this.updateFocusRect(), 100);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  registerWord(el: HTMLElement, index: number) {
    this.wordRefs[index] = el;
  }

  updateFocusRect() {
    const container = this.containerRef.nativeElement;
    const activeWord = this.wordRefs[this.currentIndex];
    if (!container || !activeWord) return;

    const parentRect = container.getBoundingClientRect();
    const activeRect = activeWord.getBoundingClientRect();

    this.focusRect = {
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    };
  }
}
