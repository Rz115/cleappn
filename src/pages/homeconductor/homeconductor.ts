import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { StatusconductorPage } from '../statusconductor/statusconductor';
import { PerfilconductorPage } from '../perfilconductor/perfilconductor';
import { TerminosconductorPage } from '../terminosconductor/terminosconductor';
import { LoginPage } from '../login/login';
//mapa
import { GoogleMaps, GoogleMap} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { ValoracionesPage } from '../valoraciones/valoraciones';
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

  Destination: any = '';
  MyLocation: any;

  public ;

  public latitud_conductor;
  public longitud_conductor;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private menu: MenuController, public geolocation: Geolocation,
    public platform: Platform, public storage: Storage) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  presentActionSheet(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Datos del conductor',
      buttons: [
        {
          text: 'Viajes',
          handler: () => {
              this.navCtrl.push(StatusconductorPage);
          }
        },
        {
          text: 'Valoraciones',
          handler: () => {
              this.navCtrl.push(ValoracionesPage);
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

  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: { lat: 17.9757056, lng: -102.2287872 }
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);

      }, function () {

      });
    } else {
      // Browser doesn't support Geolocation
    }

    directionsService.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  //localizar posicion actual del usuario
  public initPage() {

    let options = {
      frecuency: 3000,
      enableHighAccuracy: true
    }
    this.geolocation.getCurrentPosition(options).then(result => {
      this.createMap(result.coords.latitude, result.coords.longitude);      
       this.latitud_conductor = result.coords.latitude;
       this.longitud_conductor = result.coords.longitude;
       
      
      /*
      this.storage.set('coords_lat', this.latitud_conductor);
      this.storage.get('coords_lat').then((val) =>{
        console.log('Latitud conductor: ', val);
      })
      this.storage.set('coords_lon', this.longitud_conductor);
      this.storage.get('coords_lon').then((val) => {
        console.log('Longitud conductor: ',val);
      })*/

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
      icon: '../../assets/img/car-icons.png'
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
