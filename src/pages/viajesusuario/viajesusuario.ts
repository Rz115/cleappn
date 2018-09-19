import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-viajesusuario',
  templateUrl: 'viajesusuario.html',
})
export class ViajesusuarioPage {
  userid: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  private menu: MenuController) {

    this.userid = this.navParams.get('userid');
    console.log(this.userid);

  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

}
