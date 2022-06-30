import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  artist = [{}, {}, {}, {}, {}, {}];
  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    // loop: true,
    centeredSlides: true,
    speed: 400,
  };

  constructor() {}
}
