import {Component, OnInit, Input} from '@angular/core';

import {  GoogleMap } from '@ionic-native/google-maps';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
/*declaramos la variable google la cual sera de importancia para traer visualizar el mapa
con el api de google */

@Component({
  selector: 'map',
  templateUrl: 'map.html',

})
export class MapComponent implements OnInit{

  @Input() isPickupRequested: boolean;
  @Input() destination: string;

  map: GoogleMap;

  constructor()

  {

  }

  ngOnInit() {


  }





  }
