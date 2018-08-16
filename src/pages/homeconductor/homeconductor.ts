import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { StatusconductorPage } from '../statusconductor/statusconductor';
import { PerfilconductorPage } from '../perfilconductor/perfilconductor';
import { TerminosconductorPage } from '../terminosconductor/terminosconductor';
import { LoginPage } from '../login/login';
//mapa
import {  GoogleMaps,GoogleMap} from '@ionic-native/google-maps';

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-homeconductor',
  templateUrl: 'homeconductor.html',
})
export class HomeconductorPage implements OnInit{

  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private menu: MenuController) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
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


  ngOnInit() {
    this.map = this.createMap();
  this.map = GoogleMaps.create('map_canvas1');
  
  
    
  }

  createMap(location = new google.maps.LatLng(17.953536, -102.193416)) {
    let mapOptions = {
      center: location,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    
    let mapEl = document.getElementById('maps');
    let map = new google.maps.Map(mapEl, mapOptions);
    
    return map;
  }
  
   
    
  


}
