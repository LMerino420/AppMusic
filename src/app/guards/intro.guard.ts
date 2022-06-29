import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate() {
    // se crea el almacenamiento
    this.storage.create();
    //se obtiene la variable en el storage
    let isIntroShowed = await this.storage.get('introShowed');
    if (isIntroShowed) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
    }
  }
}
