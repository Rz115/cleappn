import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
/*declaramos la variable google la cual sera de importancia para traer visualizar el mapa
con el api de google */
declare var google: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  /*este elemento es necesario para que funcione el elemento de mapa dentro de las funciones
  nativas de ionic con el api de mapa de google*/
  @ViewChild('map') mapElement;
  map:any;
  
  constructor(public navCtrl: NavController) {

  }
  /*mostramos el mapa cada que se abra la pagina para mostrar los datos de la inmobiliaria
que se seleccione*/
ionViewDidLoad(){
  this.showMap();
  
}
//la funcion para mostrar el mapa 
showMap() {
  /*en la variable locacion guardamos la latitud y la longitud */
  var location = new google.maps.LatLng(17.979020, -102.214614);
/*agregamos dentro el metodo algunas opciones de como queremos que se visaulice el mapa
como tamaño de visión, tipo e mapa y de nuevo traemos la variable location a la que acabamos
de asignarle valores en la linea anterior */
  var options = {
    center: location, 
    zoom: 16,
    mapTypeId: 'roadmap'
  }
/*aqui creamos la variable map la cual contiene los elementos que acabamos de asignarle al 
//mapa que se mostrara*/
var map = new google.maps.Map(this.mapElement.nativeElement,options);
/*traemos dentro del metodo showmapa el marcador de la propiedad que creamos en el siguiente
metodo*/
this.addMarker(location, map);
}
//agregamos una marca del punto donde se encuentra la propiedad dentro del mapa
addMarker(position, map){
  return new google.maps.Marker({
    position,
    map
  });
}



}
