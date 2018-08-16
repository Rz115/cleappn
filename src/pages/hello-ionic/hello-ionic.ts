import { Component, Input, OnInit } from '@angular/core';
import { NavController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { ProcesandoServicioPage } from '../procesando-servicio/procesando-servicio';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {  GoogleMaps,GoogleMap, MyLocation, Marker, GoogleMapsAnimation } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { MapComponent } from '../../components/map/map';

declare var google: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',


})

export class HelloIonicPage implements OnInit{
  @Input() public isPickupRequested: boolean;
  @Input() destination: string;

  map: GoogleMap;
  userDetails : any;
  responseData: any;

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

  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController,
    public authService:AuthServiceProvider,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
    public platform: Platform,
    public loadingCtrl: LoadingController
  )
  {
    const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;

      this.userPostData.user_id = this.userDetails.user_id;
      this.userPostData.token = this.userDetails.token;

      //alerta para activar el gps
      this.platform.ready().then(()=>{
        this.geolocation.getCurrentPosition().then(result => {
          console.log('1' + result.coords.latitude)
          this.latOri = result.coords.latitude;
          this.latDest = result.coords.longitude;
        }).catch(function(e){
          console.log('2-error')
          alert('GPS desactivado. Active por favor')
        });
      });
    this.isPickupRequested = false;
  }

calcRota(latDest, lngDest){
  console.log(this.latOri)
  this.loadMap(this.latOri, this.longOri, parseFloat(latDest), parseFloat(lngDest));
}

//INICIO CALCULO...calculo de distancia y tiempo, mostrar marca de distancia, mostrar origen y destino
private loadMap(latOri, lngOri, latDest, lngDest)
{
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
   directionsDisplay = new google.maps.DirectionsRenderer();
   var bounds = new google.maps.LatLngBounds;
   var markersArray = [];

   var origin1 = {lat: parseFloat(latOri), lng: parseFloat(lngOri)};
   var destinationA = {lat: latDest, lng: lngDest};

   var destinationIcon = 'https://chart.googleapis.com/chart?' +
       'chst=d_map_pin_letter&chld=D|FF0000|000000';
   var originIcon = 'https://chart.googleapis.com/chart?' +
       'chst=d_map_pin_letter&chld=O|FFFF00|000000';
   var map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: latOri, lng: lngOri},
     zoom: 100
   });
   directionsDisplay.setMap(map);
   var geocoder = new google.maps.Geocoder;

   var service = new google.maps.DistanceMatrixService;
   service.getDistanceMatrix({
     origins: [origin1],
     destinations: [destinationA],
     travelMode: 'DRIVING',
     unitSystem: google.maps.UnitSystem.METRIC,
     avoidHighways: false,
     avoidTolls: false
   }, function(response, status) {
     if (status !== 'OK') {
       alert('Error was: ' + status);
     } else {
       var originList = response.originAddresses;
       var destinationList = response.destinationAddresses;
       var outputDiv = document.getElementById('output');
       outputDiv.innerHTML = '';
       deleteMarkers(markersArray);

       var showGeocodedAddressOnMap = function(asDestination) {
         var icon = asDestination ? destinationIcon : originIcon;
         return function(results, status) {
           if (status === 'OK') {
             map.fitBounds(bounds.extend(results[0].geometry.location));
             /*markersArray.push(new google.maps.Marker({
               map: map,
               position: results[0].geometry.location,
               icon: icon
             }));*/
           } else {
             alert('Geocode was not successful due to: ' + status);
           }
         };
       };

       directionsService.route({
         origin: origin1,
         destination: destinationA,
         travelMode: 'DRIVING'
       }, function(response, status) {
         if (status === 'OK') {
           directionsDisplay.setDirections(response);
         } else {
           window.alert('Directions request failed due to ' + status);
         }
       });


       for (var i = 0; i < originList.length; i++) {
         var results = response.rows[i].elements;
         geocoder.geocode({'address': originList[i]},
             showGeocodedAddressOnMap(false));
         for (var j = 0; j < results.length; j++) {
           geocoder.geocode({'address': destinationList[j]},
               showGeocodedAddressOnMap(true));
           outputDiv.innerHTML += 'DE: ' + originList[i] + ' || PARA: ' + destinationList[j] +
               '|| DISTANCIA: ' + results[j].distance.text + ' TIEMPO ' +
               results[j].duration.text + '<br>';
         }
       }
     }
   });

   function deleteMarkers(markersArray) {
     for (var i = 0; i < markersArray.length; i++) {
       markersArray[i].setMap(null);
     }
     markersArray = [];
   }
}
//FIN CALCULO

ionViewWillEnter(){
  this.platform.ready().then(() => {
    this.initPage();
  })
}

//localizar posicion actual del usuario
initPage()
{

  let loading = this.loadingCtrl.create({
    content: 'Cargando mapa...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 1000);

  let options = { timeout: 10000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(options)
      .then((result) => {
        this.conductores = new google.maps.LatLng(result.coords.latitude, result.coords.longitude);
        const mapOptions = {
          zoom: 18,
          center: this.conductores,
          disableDefaultUI: true
        }
        let map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.markers(this.conductores);

    let options = {
      frecuency: 3000,
      enableHighAccuracy: true
    }

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
  this.map = this.createMap(20.971294,-89.597);
  this.map = GoogleMaps.create('map_canvas');
  this.getLocation();
  this.presentToast();

}

createMap(lat, lng) {
  let location = new google.maps.LatLng(lat, lng)
  let mapOptions = {
    center: location,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  }

  let mapEl = document.getElementById('map');
  let map = new google.maps.Map(mapEl, mapOptions);
  let marker = new google.maps.Marker({
    position: location,
    titulo: 'posicion del conductor',
    icons: 'http:/maps.google.com/mapfiles/ms/icons/green-dot.png'
  })
  marker.setMap(this.map);
  return map;
}

 //pasar a pantalla para solicitar servicio
 contratarservicio(){
    this.navCtrl.push(ProcesandoServicioPage);
    this.isPickupRequested = true;
  }
  cancelarservicio(){
    this.isPickupRequested = false;
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
      duration: 4000
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }
  private dismissHandler() {
    console.info('Toast onDidDismiss()');
  }

}
