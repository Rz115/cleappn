import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormadepagoPage } from './formadepago';
import { PayPal } from '@ionic-native/paypal';

@NgModule({
  declarations: [
    FormadepagoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormadepagoPage),
  ],
  providers:[
    PayPal
  ]
})
export class FormadepagoPageModule {}
