import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RandomDogsPageRoutingModule } from './random-dogs-routing.module';

import { RandomDogsPage } from './random-dogs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RandomDogsPageRoutingModule
  ],
  declarations: [RandomDogsPage]
})
export class RandomDogsPageModule {}
