import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, AlertController } from 'ionic-angular';
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
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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

  /*latOri = 20.971294;
  longOri = -89.597;*/

  latDest = 20.972594;
  longDest = -89.597;

  Destination: any = '';
  MyLocation: any;

  //public ;

  public latitud_conductor;
  public longitud_conductor;

  variablelatitud = {"id_driver":"","latitud": ""};

  variablelongitud = {"id_driver":"","longitud":""};

  //VARIABLE PARA BUSQUEDA DE ID DE CONDUCTOR Y LE LLEGUE O NO SOLICITUD D SERVICIO
  soli:any;

  responseDatas : any = [];
  responseDatass : any = [];
  userDetails : any;
  userid: string

  indi: any; 
  solicitud = {"id_driver":"","indicator":""};
  respuest : any = [];
  getlati: any;
  getlongi: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, 
    private menu: MenuController, 
    public geolocation: Geolocation,
    public platform: Platform, 
    public storage: Storage,
    public authService: AuthServiceProvider, 
    public http: Http,
    private alertCtrl: AlertController) {

      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
  
  
  
      this.userid = this.userDetails.id_driver;
     

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
              this.navCtrl.push(PerfilconductorPage, {"userid": this.userid });
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

       //variables de latitud
       this.variablelatitud.id_driver = this.userid;
       this.variablelatitud.latitud = this.latitud_conductor;
       //variables de longitud
       this.variablelongitud.id_driver = this.userid;
       this.variablelongitud.longitud = this.longitud_conductor;
       this.postt();
      
       
       
      
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

  postt (){
    this.authService.postData(this.variablelatitud,'loadlatitud').then((result) => {
      this.responseDatas = result[0];
      console.log("coordenadas actualizados!")
       
  }, (err) => 
  {
  console.log("Error al mandar coordenadas")// Error log
  });

  this.authService.postData(this.variablelongitud,'loadlongitud').then((result) => {
    this.responseDatass = result[0];
    console.log("coordenadas actualizados!")
     
}, (err) => 
{
console.log("Error al mandar coordenadas")// Error log
});


  
  }

  // METODO DE ALERTA PARA RECIBIR SI ACEPTAR O NO SERVICIO
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Se ha encontrado un nuevo servicio',
      buttons: [
        {
          text: 'Rechazar',
          role: 'cancel',
          handler: () => {
          //METODO PARA CAMBIAR EL VALOR DEL INDICADOR UNA VEZ RECHAZE EL CONDUCTOR
          this.solicitud.id_driver = this.userid
          this.authService.postData(this.solicitud,'rechazarServicio').then((result) => {
            this.respuest = result[0];
                       
    }, (err) => {
      // Error log
    });
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
           //METODO PARA CAMBIAR EL VALOR DEL INDICADOR UNA VEZ ACEPTE EL CONDUCTOR
           this.solicitud.id_driver = this.userid
            this.authService.postData(this.solicitud,'aceptarservicio').then((result) => {
              this.respuest = result[0];
              this.getlati = 18.018304
              this.getlongi = -102.2132224
              this.loadMap(this.latitud_conductor, this.longitud_conductor,parseFloat(this.getlati), parseFloat(this.getlongi));
              //METODO PARA CARGAR EL MAPA DE LAS COORDENADAS DEL USUARIO Y LAS DE CONDUCTOR

      }, (err) => {
        // Error log
      });

          }
        }
      ]
    });
    alert.present();
  }

  alertaCancelacionDeUsuario() {
    let alert = this.alertCtrl.create({
      title: 'Se ha cancelado el servicio solicitado',
      
      buttons: [
        {
          text: 'De acuerdo',
          handler: () => {
            //METODO PARA CAMBIAR EL VALOR DEL INDICADOR UNA VEZ EL CONDUCTOR SEA NOTIFICADO QUE CANCELARON
            //SU SERVICIO
          this.solicitud.id_driver = this.userid;
          this.authService.postData(this.solicitud,'rechazarServicio').then((result) => {
            this.respuest = result[0];
                       
    }, (err) => {
      // Error log
    });
          }
        }
       ]
    });
    alert.present();
  }



  //INICIO CALCULO...calculo de distancia, mostrar marca de distancia, mostrar origen y destino
  private loadMap(latOri, lngOri, latDest, lngDest) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay = new google.maps.DirectionsRenderer();
    var bounds = new google.maps.LatLngBounds;
    var markersArray = [];

    var origin1 = { lat: parseFloat(latOri), lng: parseFloat(lngOri) };
    var destinationA = { lat: latDest, lng: lngDest };

    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: latOri, lng: lngOri },
      zoom: 70,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
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
    }, function (response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var outputDiv = document.getElementById('output');
        //outputDiv.innerHTML = '';
        deleteMarkers(markersArray);

        var destinationIcon = '../../assets/img/marker.png';
        var originIcon = '../../assets/img/car-icons.png';

        var showGeocodedAddressOnMap = function (asDestination) {
          var icon = asDestination ? destinationIcon : originIcon;
          return function (results, status) {
            if (status === 'OK') {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              /*markersArray.push(new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: icon
              }));*/
            } else {
              alert('Dirección erronea: ' + status);
            }
          };
        };

        directionsService.route({
          origin: origin1,
          destination: destinationA,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Dirección erronea ' + status);
          }
        });

        for (var i = 0; i < originList.length; i++) {
          var results = response.rows[i].elements;
          geocoder.geocode({ 'address': originList[i] },
            showGeocodedAddressOnMap(false));
          for (var j = 0; j < results.length; j++) {
            geocoder.geocode({ 'address': destinationList[j] },
              showGeocodedAddressOnMap(true));
            /*outputDiv.innerHTML += '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item> Posición actual: ' + originList[i] + ' <br>Posición conductor: ' + destinationList[j] +
              '<br>Distancia: ' + results[j].distance.text + ' <br>Tiempo de llegada: ' +
              results[j].duration.text + '</ion-item></div>'*/

              ;

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
  ngOnInit() {
  this.map = GoogleMaps.create('map_canvas1');
 
  // BUSCA EL CAMBIO EN EL CAMPO INDICADOR DEL CONDUCTOR
  this.solicitud.id_driver = this.userid
  this.authService.postData(this.solicitud,'cambioindicador').then((result) => {
    this.soli = result;
    console.log(this.soli.indicator); 

    if(this.soli.indicator == 0){
      console.log("Disponible")
    }
    
     if(this.soli.indicator == 1){
      this.presentConfirm();
    }
   
     if(this.soli.indicator == 2){
      this.alertaCancelacionDeUsuario();
    }

    //AQUI PUEDE IR OTRO ELSE IF PARA VER QUE SI EL INDICADOR ES IGUAL A 0 
    //EL NG ONINIT ESTE CARGANDOSE CADA CIERTO TIEMPO (SI, ESTE MISMO MÉTODO)
    
     
}, (err) => {
// Error log
});

//OBTENER COORDENADAS DEL USUARIO PARA TRAZAR RUTA LATITUD
this.authService.getlat()
.subscribe(data => {
  this.getlati = data.usuariolat
//console.log(this.getlati);

}, err => {
console.log(err)
}
)

//OBTENER COORDENADAS DEL USUARIO PARA TRAZAR RUTA LONGITUD
this.authService.getlong()
.subscribe(data => {
  this.getlongi = data.usuariolong
//console.log(this.getlongi);

}, err => {
console.log(err)
}
)

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
      icon: 'assets/img/car-icons.png'
    })

    let content = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>' + marker.title + '</h6></ion-row></ion-item></ion-item></div>'

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
