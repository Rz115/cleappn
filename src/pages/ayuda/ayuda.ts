import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

/**
 * Generated class for the AyudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private menu: MenuController,
  public alertCtrl: AlertController) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Mensaje Enviado',
      subTitle: 'Gracias por su mensaje, se le responderá a la brevedad',
      buttons: ['Ok']
    });
    alert.present();
  }

}
