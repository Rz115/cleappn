import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NavController, ToastController, Nav, MenuController, Platform, LoadingController, NavParams } from 'ionic-angular';
import { ProcesandoServicioPage } from '../procesando-servicio/procesando-servicio';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GoogleMaps, GoogleMap, MyLocation, Marker, GoogleMapsAnimation, MarkerOptions, LatLng, GoogleMapsEvent, CameraPosition } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { MapComponent } from '../../components/map/map';
import { PerfilusuarioPage } from '../perfilusuario/perfilusuario';
import { ViajesusuarioPage } from '../viajesusuario/viajesusuario';
import { FormadepagoPage } from '../formadepago/formadepago';
import { AyudaPage } from '../ayuda/ayuda';
import { TerminosPage } from '../terminos/terminos';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { HomeconductorPage } from '../homeconductor/homeconductor';

declare var google: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',


})

export class HelloIonicPage implements OnInit{
  @ViewChild(Nav) nav: Nav;

  @Input() public isPickupRequested: boolean;
  @Input() destination: string;

  

  map: GoogleMap;

  activarServicio: boolean = false;

  myPosition:any = {};
  markers: any[] = [
    {
      position: {
        latitude: 17.971698,
        longitude: -102.223622
      },
      title: 'Hector',
      icon: '../../assets/img/marker.png'
    },
    {
      position: {
        latitude: 17.973218,
        longitude: -102.224910
      },
      title: 'Luis',
      icon: '../../assets/img/marker.png'
    },
  ];

  userDetails : any;
  responseData: any;

  service: any;

  longitud: any[];
  latitud: any[];

  public lat: number = 20.971294;
  public lng: number = -89.597;

  latOri: any;
  longOri: any;
  latDest: any;
  longDest: any;
  latresult: any;
  lonresult: any;

  userPostData = {"user_id":"","token":""};
  userid: number

  constructor(public navCtrl: NavController,
    public authService:AuthServiceProvider,
    public toastCtrl: ToastController,
    public menu: MenuController,
    public geolocation: Geolocation,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public navParams: NavParams,
    public googleMaps: GoogleMaps
  ) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    //alerta para activar el gps
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then(result => {
        console.log('1' + result.coords.latitude)
        this.latOri = result.coords.latitude;
        this.latDest = result.coords.longitude;
      }).catch(function (e) {
        console.log('2-error')
        alert('GPS desactivado. Active por favor')
      });
    });
    this.isPickupRequested = false;
  

}


  calcRota(latDest, lngDest) {
    this.isPickupRequested = true;
    let options = {
      frecuency: 3000,
      enableHighAccuracy: true
    }
    this.geolocation.getCurrentPosition(options).then(result => {
      this.createMap(result.coords.latitude, result.coords.longitude);
      this.latOri = result.coords.latitude;
      this.longOri = result.coords.longitude
      
      
      for(var i = 0; i<= 15; i++){
        this.latresult = this.latOri - 17.969148
        this.lonresult = (this.longOri) - ((-102.221693)) 
        console.log("resultado resta lat", this.latresult)
        console.log("resultado resta lon", this.lonresult)
      }

      console.log("resultado resta lat" , this.latresult)
      console.log("resultado resta lon", this.lonresult)


      this.loadMap(this.latOri, this.longOri, (17.969148), (-102.221693)); 

    }).catch((error) => {
      console.log(error);
    })

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
    }, function (response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '';
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
            outputDiv.innerHTML += '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item> Posicion actual: ' + originList[i] + ' <br>Posición conductor: ' + destinationList[j] +
              '<br>Distancia: ' + results[j].distance.text + ' <br>Tiempo de llegada' +
              results[j].duration.text + '</ion-item></div>'
              
              //condicional para detectar el que taxi que esté más cerca
                console.log("distancia", results[j].distance.value)
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
  //pasar a pantalla para solicitar servicio
  contratarservicio(activarServicio: boolean) {
    this.navCtrl.push(ProcesandoServicioPage);
    this.isPickupRequested = true;
    if(activarServicio == true){
      
    }
  }
  cancelarservicio() {    
    this.ionViewWillEnter();
    this.isPickupRequested = false;
  }

  presentToastservicio() {
    const toast = this.toastCtrl.create({
      message: 'Bienvenido' + " " + this.userDetails.name,
      duration: 4000
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }


ionViewWillEnter(){
  this.platform.ready().then(() => {
    this.initPage();
  })
}

//localizar posicion actual del usuario
initPage()
{
  this.isPickupRequested = false;
  let options = {
    frecuency: 3000,
    enableHighAccuracy: true
  }
    this.geolocation.getCurrentPosition(options).then(result => {
      this.createMap(result.coords.latitude, result.coords.longitude);
      console.log('Lat user', result.coords.latitude);
      console.log('Lon user', result.coords.longitude); 


      
    }).catch((error) => {
      console.log(error);
    })  
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

    //icono del usuario
    let marker = new google.maps.Marker({
      title: 'Posición actual',
      position: location,
      icon: '../../assets/img/marker.png'
    })
    
    let content = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>'+ marker.title +'</h6><h6>' + marker.position + '</h6></ion-row></ion-item></ion-item></div>'

    

    this.addInfoWindow(marker, content);
    marker.setMap(this.map);

    //carro 1
    let markerOptions = new google.maps.Marker ({
      position: new google.maps.LatLng(20.987488, -89.629035),
      title: "",
      icon: '../../assets/img/car-icons.png'
    })

    let contents = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>' + markerOptions.title + '</h6><h6>' + '</h6></ion-row></ion-item></ion-item></div>'
    this.addInfoWindow(markerOptions, contents);
    markerOptions.setMap(this.map);

    //carro 2
    let markerOptions2 = new google.maps.Marker({
      position: new google.maps.LatLng(20.965047, -89.585261),
      title: "",
      icon: '../../assets/img/car-icons.png'
    })


    let contents2 = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>' + markerOptions2.title + '</h6><h6>' + '</h6></ion-row></ion-item></ion-item></div>'
    this.addInfoWindow2(markerOptions2, contents2);
    markerOptions2.setMap(this.map);


    //carro 3
    let markerOptions3 = new google.maps.Marker({
      position: new google.maps.LatLng(20.978593, -89.597190),
      title: "",
      icon: '../../assets/img/car-icons.png'
    })
    let contents3 = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>' + markerOptions3.title + '</h6><h6>' + '</h6></ion-row></ion-item></ion-item></div>'
    this.addInfoWindow3(markerOptions3, contents3);
    markerOptions3.setMap(this.map);
    
    //carro 4
    let markerOptions4 = new google.maps.Marker({
      position: new google.maps.LatLng(20.974583, -89.652552),
      title: "",
      icon: '../../assets/img/car-icons.png'
    })
    let contents4 = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>' + markerOptions4.title + '</h6><h6>' + '</h6></ion-row></ion-item></ion-item></div>'
    this.addInfoWindow4(markerOptions4, contents4);
    markerOptions4.setMap(this.map);
    
  }

  addMarker(options) {
    let mapOptions = {
      position: (options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon
    };
    this.map.addMarker(mapOptions);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })

  }
  addInfoWindow2(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })

  }
  addInfoWindow3(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })

  }
  addInfoWindow4(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })

  }
  addInfosWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })

  }

  ngOnInit() {
    this.map = GoogleMaps.create('map_canvas');
    this.presentToast();
    document.getElementById("right-panel").hidden = true;

    this.authService.getData().subscribe(
      data => {
        this.latitud = data.consulta
        console.log(this, this.latitud, "nueas latitud");
      },
      err => {
        console.log(err)
      }
    );
    this.authService.getData().subscribe(
      data => {
        this.longitud = data.consulta
      },
      err => {
        console.log(err)
      }
    )

  }
  

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Bienvenido' + " " + this.userDetails.name,
      duration: 4000
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }
  private dismissHandler() {
    console.info('Toast onDidDismiss()');
  }
  
//PAGINAS DEL MENU

//PAGINA DE PERFIL
perfil(iduser: number){
  this.userid = this.userDetails.user_id;
  
  this.navCtrl.push(PerfilusuarioPage, {"userid": iduser,"userDetails": this.userDetails });
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

}
