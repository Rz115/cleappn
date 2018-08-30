import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValoracionesPage } from './valoraciones';

@NgModule({
  declarations: [
    ValoracionesPage,
  ],
  imports: [
    IonicPageModule.forChild(ValoracionesPage),
  ],
})
export class ValoracionesPageModule {}
