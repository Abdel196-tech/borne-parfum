import {
    trigger,
    transition,
    style,
    query,
    animate,
    group
  } from '@angular/animations';
  
  export const slideInAnimation =
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0
          })
        ], { optional: true }),
  
        group([
          query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
  
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('300ms ease-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true })
        ])
      ])
    ]);
  