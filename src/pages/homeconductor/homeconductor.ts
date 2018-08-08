import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { StatusconductorPage } from '../statusconductor/statusconductor';
import { PerfilconductorPage } from '../perfilconductor/perfilconductor';
import { TerminosconductorPage } from '../terminosconductor/terminosconductor';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-homeconductor',
  templateUrl: 'homeconductor.html',
})
export class HomeconductorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeconductorPage');
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Datos del conductor',
      buttons: [
        {
          text: 'Status',
          handler: () => {
              this.navCtrl.push(StatusconductorPage);
          }
        },
        {
          text: 'Perfil',
          handler: () => {
              this.navCtrl.push(PerfilconductorPage);
          }
        },
        {
          text: 'Términos y condiciones',
          handler: () => {
            this.navCtrl.push(TerminosconductorPage);
          }
        },
        {
          text: 'Salir de la cuenta',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    actionSheet.present();
  }

}
