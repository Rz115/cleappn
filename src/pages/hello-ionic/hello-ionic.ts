import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NavController, ToastController, Nav, MenuController, Platform, LoadingController, NavParams } from 'ionic-angular';
import { ProcesandoServicioPage } from '../procesando-servicio/procesando-servicio';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { PerfilusuarioPage } from '../perfilusuario/perfilusuario';
import { ViajesusuarioPage } from '../viajesusuario/viajesusuario';
import { FormadepagoPage } from '../formadepago/formadepago';
import { TerminosPage } from '../terminos/terminos';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


declare var google: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [AuthServiceProvider]


})

export class HelloIonicPage implements OnInit{
  @ViewChild(Nav) nav: Nav;

  @Input() public isPickupRequested: boolean;
  @Input() destination: string;
  ocultar: boolean = true;
  buscador: any[];
  

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
  coordenadas1: any[];

  public lat: number = 20.971294;
  public lng: number = -89.597;

  latOri: any;
  longOri: any;
  latDesti: any[];
  longDest: any[];
  latresult: any;
  lonresult: any;
  distance: any = 1000000
  cerca: any
  mindif: any
  contadorlat: any = 100
  contadorlon: any = 100
  responseDatas : any = [];
  solicitud = {"user_id":"","indicator":""};
  
  //SE ENVIAN LAS COORDENADAS A LA TABLA DEL CONDUCTOR
  variablescoordenadas = {"id_driver":"","usuariolat": "","usuariolong":""};
  variablelongitud = {"usuariolong":""};
  
  public unregisterBackButtonAction: any;
  userPostData = {"user_id":"","token":"", "username":"","email":""};
  userid: number;
  idConductor: any[];

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
    this.getCoordsDriver();
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;



    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.userid = this.userDetails.user_id;

    this.isPickupRequested = false;
  

}

  EcuacionDistancia(lat1, lon1, lat2, lon2) {
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
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
  
      //detectar conductor mas cercano
      for (var i = 0; i <= 10; i++) {        
        var dif = this.EcuacionDistancia(this.latOri, this.longOri, this.latDesti[i], this.longDest[i])
          if(dif < this.distance){
            this.distance = dif
            this.cerca = i
          }
          console.log(this.cerca, "numero del cerca ",
          this.distance, "resultado de la cuenta")
        }

        this.loadMap(this.latOri, this.longOri, parseFloat(this.latDesti[this.cerca]), parseFloat(this.longDest[this.cerca]));
        this.Postdecoordenadas();
          //METODO PARA CAMBIAR EL ESTADO DEL CONDUCTOR 
      this.solicitud.indicator = this.cerca
      this.authService.postData(this.solicitud, 'solicitudes').then((result) => {
        this.responseDatas = result[0],
          er => console.log(er),
          () => console.log('Ok')


      }, (err) => {
        // Error log
      });

    }).catch((error) => {
      console.log(error);
    })
    

  }

  Postdecoordenadas(){
    // METODO PARA ENVIAR TUS COORDENADAS LATITUD Y LONGITUD AL CONDUCTOR MÁS CERCANO  CON SU ID DE CONDUCTOR
    //AQUÍ MISMO SE PUEDE AGREGAR MANDAR EL ID DEL USUARIO PARA QUE EL CONDUCTOR SEPA A QUÉ USUARIO ATENDIÓ
    this.variablescoordenadas.id_driver = this.cerca
    this.variablescoordenadas.usuariolat = this.latOri
    this.variablescoordenadas.usuariolong = this.longOri
     this.authService.postData(this.variablescoordenadas,'sendcoordenadasParaConductor').then((result) => {
            this.responseDatas = result[0],
            er => console.log(er),
           () => console.log('Ok')
          
            
    }, (err) => {
      // Error log
    });
    
  
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
            outputDiv.innerHTML += '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item> Posición actual: ' + originList[i] + ' <br>Posición conductor: ' + destinationList[j] +
              '<br>Distancia: ' + results[j].distance.text + ' <br>Tiempo de llegada: ' +
              results[j].duration.text + '</ion-item></div>'

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
    this.solicitud.indicator = this.cerca
    this.authService.postData(this.solicitud,'cancelarsolicitudes').then((result) => {
      this.responseDatas = result[0],
      er => console.log(er),
     () => console.log('Ok')
    
      
}, (err) => {
// Error log
});
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
    setInterval(this.initPage, 1000)
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

      }).catch((error) => {
       // console.log(error);
      })  

  }

  ngOnInit() {
    this.map = GoogleMaps.create('map_canvas');
    this.presentToast();
    document.getElementById("right-panel").hidden = true;

    this.initPage();
    this.metodobotonservicio();
  }
  //obtener las coordenadas del chofer
  getCoordsDriver(){

    this.authService.getlatitud1()
      .subscribe(data => {
        this.latDesti = data
    }, err => {
      console.log(err)
    }
    )
    this.authService.getlongitud1()
    .subscribe(datas => {
        this.longDest = datas
      }, err => {
        console.log(err)
      })

       // obtener todos los id de conductores para relacionarlos con sus coordenadas
       this.authService.getiddrivers()
       .subscribe(datass => {
           this.idConductor = datass
         //  console.log(this.idConductor)
         }, err => {
           console.log(err)
         })

    
  }
<<<<<<< HEAD
  /* METODO PARA ACTIVAR O DESACTIVAR BOTON DE CONTRATAR SERVICIO */
  metodobotonservicio(){
    this.authService.getidtarjeta().subscribe(dataz => {
      for (var i=0; i<=this.userid; i++){
        if(this.userDetails.user_id == dataz[i]){
          this.ocultar = false;
          console.log(this.buscador)
        }}},
        err => {
        console.log(err)
      })
  }
=======
/* METODO PARA ACTIVAR O DESACTIVAR BOTON DE CONTRATAR SERVICIO */
metodobotonservicio(){
  this.authService.getidtarjeta().subscribe(dataz => {
    for (var i=0; i<=this.userid; i++){
      if(this.userDetails.user_id == dataz[i]){
        this.ocultar = false;
       // console.log(this.buscador)
      }}},
       err => {
      console.log(err)
    })
}
>>>>>>> e4ce6852f634493205d4051fd7bf827b51c04242
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
      animation: google.maps.Animation.BOUNCE,
      position: location,
      icon: 'assets/img/marker.png'
    })
    
    let content = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>'+ marker.title +'</ion-row></ion-item></ion-item></div>'

    

    this.addInfoWindow(marker, content);
    marker.setMap(this.map);
    
    //mostrar todos los autos disponibles
    for (var i=0; i<=100; i++){
        let markerOptions = new google.maps.Marker ({
          position: new google.maps.LatLng(this.latDesti[i], this.longDest[i]),
          title: "Conductor en servicio",
          icon: 'assets/img/car-icons.png'
        })
      

        let contents = '<div id="myId" class="item item-thumbnail-left item-text-wrap"><ion-item><ion-row><h6>' + markerOptions.title + '</h6><h6>' + '</h6></ion-row></ion-item></ion-item></div>'
        this.addInfoWindow(markerOptions, contents);
        markerOptions.setMap(this.map);
      }
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
perfil(){
  
  
  this.navCtrl.push(PerfilusuarioPage, {"userid": this.userid });

  this.menu.close();
}

//PAGINA DE VIAJES REECIENTES
viajes(){
  this.navCtrl.push(ViajesusuarioPage, {"userid": this.userid });
  this.menu.close();
}

//PAGINA DE FORMAS DE PAGO
formapago(){
  this.navCtrl.push(FormadepagoPage, {"userid": this.userid });
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
