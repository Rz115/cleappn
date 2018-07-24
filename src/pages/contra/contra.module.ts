import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContraPage } from './contra';

@NgModule({
  declarations: [
    ContraPage,
  ],
  imports: [
    IonicPageModule.forChild(ContraPage),
  ],
})
export class ContraPageModule {}
