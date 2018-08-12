import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ConductorEncontradoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conductor-encontrado',
  templateUrl: 'conductor-encontrado.html',
})
export class ConductorEncontradoPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  private menu: MenuController) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }
 

}
