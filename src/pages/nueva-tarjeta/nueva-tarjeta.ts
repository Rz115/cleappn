import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';


/**
 * Generated class for the NuevaTarjetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nueva-tarjeta',
  templateUrl: 'nueva-tarjeta.html',
})
export class NuevaTarjetaPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
  private menu: MenuController) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }
  
  guardartarjeta(){
    this.presentLoading();
    
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Guardando Cambios...",
      duration: 2000
    });
    loader.present();
    
  }
}
