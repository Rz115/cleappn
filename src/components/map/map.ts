import { Component, OnInit } from '@angular/core';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
/*declaramos la variable google la cual sera de importancia para traer visualizar el mapa
con el api de google */
declare var google: any;
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit{

public map;

  constructor() {

  }


  

  ngOnInit(){
    this.map = this.createMap();
  }

  createMap(location = new google.maps.LatLng(17.979020, -102.214614)){
    let mapOptions = {
      center: location, 
      zoom: 16,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disabelDefaultUI: true,
    geolocation: true
      
    }

    let mapEL = document.getElementById('map');
    let map = new google.maps.Map(mapEL, mapOptions);

    return map;
  }

}
