import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowSongsPageRoutingModule } from './show-songs-routing.module';

import { ShowSongsPage } from './show-songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowSongsPageRoutingModule
  ],
  declarations: [ShowSongsPage]
})
export class ShowSongsPageModule {}
