import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { APIRestPageRoutingModule } from './api-rest-routing.module';

import { APIRestPage } from './api-rest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    APIRestPageRoutingModule
  ],
  declarations: [APIRestPage]
})
export class APIRestPageModule {}
