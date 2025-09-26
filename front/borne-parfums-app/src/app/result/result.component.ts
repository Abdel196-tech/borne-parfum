import { Component } from '@angular/core';

interface Perfume {
  id: number;
  name: string;
  year: number;
  type: string;
  intensity: number;
  descriptors: string[];
  backgroundColor: string;
  bottleColor: string;
  capColor: string;
  backgroundImage: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  perfumes: Perfume[] = [
    {
      id: 1,
      name: 'Haliane',
      year: 2021,
      type: 'Eau de Parfum',
      intensity: 3,
      descriptors: ['Oud', 'Aromatic', 'Sweet'],
      backgroundColor: '#8B4A9C',
      bottleColor: '#2D5016',
      capColor: '#D4AF37',
      backgroundImage: 'assets/images/purple-flowers.jpg'
    },
    {
      id: 2,
      name: 'Kalan',
      year: 2019,
      type: 'Eau de Parfum',
      intensity: 4,
      descriptors: ['Warm Spicy', 'Woody', 'Fresh Spicy'],
      backgroundColor: '#8B0000',
      bottleColor: '#8B0000',
      capColor: '#F5F5F5',
      backgroundImage: 'assets/images/spices-background.jpg'
    },
    {
      id: 3,
      name: 'Carlisle',
      year: 2015,
      type: 'Eau de Parfum',
      intensity: 4,
      descriptors: ['Vanilla', 'Patchouli', 'Fresh Spicy'],
      backgroundColor: '#8B4513',
      bottleColor: '#2F2F2F',
      capColor: '#C0C0C0',
      backgroundImage: 'assets/images/walnuts-background.jpg'
    }
  ];

  getIntensityDots(intensity: number): boolean[] {
    return Array(4).fill(false).map((_, index) => index < intensity);
  }

  getIntensityClass(intensity: number, index: number): string {
    if (index < intensity) {
      return 'intensity-dot filled';
    }
    return 'intensity-dot empty';
  }
}