import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { StatusconductorPage } from '../statusconductor/statusconductor';
import { PerfilconductorPage } from '../perfilconductor/perfilconductor';
import { TerminosconductorPage } from '../terminosconductor/terminosconductor';
import { LoginPage } from '../login/login';
//mapa
import { GoogleMaps, GoogleMap, MyLocation, Marker, GoogleMapsAnimation } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-homeconductor',
  templateUrl: 'homeconductor.html',
})
export class HomeconductorPage implements OnInit{

  map: GoogleMap;

  service: any;
  markers: any;
  conductores: [{
    none: 'conductor Roque',
    lat: 20.971294,
    lng: -89.597
  }]

  public lat: number = 20.971294;
  public lng: number = -89.597;

  latOri = 20.971294;
  longOri = -89.597;

  latDest = 20.972594;
  longDest = -89.597;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private menu: MenuController, public geolocation: Geolocation,
    public platform: Platform) {
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


  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.initPage();
    })
  }
  //localizar posicion actual del usuario
  initPage() {

    let options = {
      frecuency: 3000,
      enableHighAccuracy: true
    }
    this.geolocation.getCurrentPosition(options).then(result => {
      this.createMap(result.coords.latitude, result.coords.longitude);
      console.log(result.coords.latitude);
      console.log(result.coords.longitude);

      let watch = this.geolocation.watchPosition(options)
        .filter((p: any) => p.code === undefined)
        .subscribe((position: Geoposition) => {
          let conductor = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.service.updateGeolocation(this.conductores.keys, conductor);
          console.log(position.coords);
          console.log(position.coords.longitude + ' ' + position.coords.latitude);
        });
      watch.unsubscribe();
    }).catch((error) => {
      console.log('Error al obtener dirección', error);
    })
  }


  ngOnInit() {

  this.map = GoogleMaps.create('map_canvas1');
  
  
    
  }

  createMap(lat, lng) {
    let location = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: location,
      zoom: 16,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    this.map = new google.maps.Map(mapEl, mapOptions);

    let marker = new google.maps.Marker({
      title: 'Posición actual',
      position: location,
      icons: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    })

    let content = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>' + marker.title + '</h6><h6>' + marker.position + '</h6></ion-row></ion-item></ion-item></div>'

    this.addInfoWindow(marker, content);
    marker.setMap(this.map);
  }
  loadPoints() {
    this.markers = [];
    for (const key of Object.keys(this.conductores)) {
      let latLng = new google.maps.LatLng(this.conductores[key].lng);
      let marker = new google.maps.Marker({
        position: latLng,
        title: this.conductores[key].name
      })
      let content = `
          <div id="myId" class="item item-thumbnail-left item-text-wrap">
            <ion-item>
              <ion-row>
                <h6> `+ this.conductores[key].name + `</h6>
              </ion-row>
            </ion-item>
          </div>
        `
      this.addInfoWindow(marker, content);
      marker.setMap(this.map);
    }
  }
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      icons: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    let content = "<h4>Información!</h4>";
    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })

  }
  
   
    
  


}
