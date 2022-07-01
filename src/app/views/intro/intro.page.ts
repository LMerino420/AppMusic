import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  slidesOps = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400,
    loop: true,
  };

  slides = [
    {
      tittle: 'Vive la musica',
      subtittle: 'Escuchala en cualquier momento',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab nostrum mollitia aliquid tempore labore illo iste omnis perferendis nemo ipsa!',
      icon: 'play',
    },
    {
      tittle: 'Cuando entrenas',
      subtittle: 'Para motivart tu entrenamiento',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab nostrum mollitia aliquid tempore labore illo iste omnis perferendis nemo ipsa!',
      icon: 'barbell',
    },
    {
      tittle: 'Cuanto trabajas',
      subtittle: 'Para concentrarte en tus labores',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab nostrum mollitia aliquid tempore labore illo iste omnis perferendis nemo ipsa!',
      icon: 'bicycle',
    },
  ];

  constructor(private router: Router, private storage: Storage) {}

  closePage() {
    this.storage.set('introShowed', true);
    this.router.navigateByUrl('/login');
  }
}
