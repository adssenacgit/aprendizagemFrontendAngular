import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  images = [
    { source: 'assets/img/banner-noticias/banner1.jpg', alt: 'Description 1' },
    { source: 'assets/img/banner-noticias/banner2.jpg', alt: 'Description 2' },
    { source: 'assets/img/banner-noticias/banner3.jpg', alt: 'Description 3' },
  ];
}
