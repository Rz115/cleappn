import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NuevaTarjetaPage } from '../nueva-tarjeta/nueva-tarjeta';

/**
 * Generated class for the FormadepagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formadepago',
  templateUrl: 'formadepago.html',
})
export class FormadepagoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormadepagoPage');
  }
  nuevacard(){
    this.navCtrl.push(NuevaTarjetaPage);
}
}
