import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the PerfilusuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfilusuario',
  templateUrl: 'perfilusuario.html',
})
export class PerfilusuarioPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilusuarioPage');
  }

  guardar(){
    this.presentLoading();
    
  }
 


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Guardando Cambios...",
      duration: 2000
    });
    loader.present();
    
  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}