import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConductorEncontradoPage } from './conductor-encontrado';

@NgModule({
  declarations: [
    ConductorEncontradoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConductorEncontradoPage),
  ],
})
export class ConductorEncontradoPageModule {}
