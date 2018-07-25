import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaTarjetaPage } from './nueva-tarjeta';

@NgModule({
  declarations: [
    NuevaTarjetaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaTarjetaPage),
  ],
})
export class NuevaTarjetaPageModule {}
