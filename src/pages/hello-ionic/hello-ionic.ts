import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController, Nav, MenuController } from 'ionic-angular';
import { ProcesandoServicioPage } from '../procesando-servicio/procesando-servicio';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {  GoogleMaps,GoogleMap, MyLocation, Marker, GoogleMapsAnimation } from '@ionic-native/google-maps';
import { PerfilusuarioPage } from '../perfilusuario/perfilusuario';
import { ViajesusuarioPage } from '../viajesusuario/viajesusuario';
import { FormadepagoPage } from '../formadepago/formadepago';
import { AyudaPage } from '../ayuda/ayuda';
import { TerminosPage } from '../terminos/terminos';
import { LoginPage } from '../login/login';
declare var google: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',


})

export class HelloIonicPage implements OnInit{
  @ViewChild(Nav) nav: Nav;
  
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
    public menu: MenuController
  ) {

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

  
//PAGINAS DEL MENU

//PAGINA DE PERFIL
perfil(){
  this.navCtrl.push(PerfilusuarioPage);
  this.menu.close();
}

//PAGINA DE VIAJES REECIENTES
viajes(){
  this.navCtrl.push(ViajesusuarioPage);
  this.menu.close();
}

//PAGINA DE FORMAS DE PAGO
formapago(){
  this.navCtrl.push(FormadepagoPage);
  this.menu.close();
}

//PAGINA DE AYUDA
ayudapage(){
  this.navCtrl.push(AyudaPage);
  this.menu.close();
}

//PAGINA DE TERMINOS Y CONDICIONES
politicas(){
  this.navCtrl.push(TerminosPage);
  this.menu.close();
}

backToWelcome(){
  this.navCtrl.setRoot(LoginPage);
  
}
//PAGINA DE CERRAR SESION
cerrarsesion(){
  localStorage.clear();
  this.menu.close();
  setTimeout(() => this.backToWelcome(), 1000);
  
  console.log("cerrando sesion");
  
  
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
