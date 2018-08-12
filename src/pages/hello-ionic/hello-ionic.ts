import { Component, Input, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ProcesandoServicioPage } from '../procesando-servicio/procesando-servicio';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {  GoogleMaps,GoogleMap, MyLocation, Marker, GoogleMapsAnimation } from '@ionic-native/google-maps';
declare var google: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
})

export class HelloIonicPage implements OnInit{
  @Input() isPickupRequested: boolean;
  @Input() destination: string;
  
  map: GoogleMap;
  userDetails : any;
  responseData: any;

  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, 
    public authService:AuthServiceProvider,
    public toastCtrl: ToastController
  ) {

  const data = JSON.parse(localStorage.getItem('userData'));
  this.userDetails = data.userData;

  this.userPostData.user_id = this.userDetails.user_id;
  this.userPostData.token = this.userDetails.token;

}

ngOnInit() {
  this.map = this.createMap();
this.map = GoogleMaps.create('map_canvas');
this.getLocation();
this.presentToast();
  
}

createMap(location = new google.maps.LatLng(20.971294, -89.597)) {
  let mapOptions = {
    center: location,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  }
  
  let mapEl = document.getElementById('map');
  let map = new google.maps.Map(mapEl, mapOptions);
  
  return map;
}

 //pasar a pantalla para solicitar servicio
 paginaproceso(){
    this.navCtrl.push(ProcesandoServicioPage);
  }
  getLocation() {
    // Obtener tu ubicacion
    this.map.getMyLocation().then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));

        // Mover la camara con animacion
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        }).then(() => {
          let marker: Marker = this.map.addMarkerSync({
            title: 'Tu ubicación',
            snippet: 'Andadores',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });

          marker.showInfoWindow();
        });
     });
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Bienvenido'+" "+ this.userDetails.name ,
      duration: 3000
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }
  private dismissHandler() {
    console.info('Toast onDidDismiss()');
  }
  
}
