import {Component, OnInit, Input} from '@angular/core';

import { GoogleMaps, GoogleMap, MyLocation, Marker, GoogleMapsAnimation } from '@ionic-native/google-maps';

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
 
  @Input() isPickupRequested: boolean;
  @Input() destination: string;
  
  map: GoogleMap;
  
  constructor()
      
  {
  
  }
  
  ngOnInit() {
    this.map = this.createMap();
 this.map = GoogleMaps.create('map_canvas');
    
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
  
  getLocation() {
    // Obtener tu ubicacion
    this.map.getMyLocation()
      .then((location: MyLocation) => {
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


  }




