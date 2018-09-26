import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-perfilconductor',
  templateUrl: 'perfilconductor.html',
})
export class PerfilconductorPage {

  //variable que guarda todos los datos
  actualizar = {"id_driver":"","name":"","email":"","phone":"","adress":"","license":"","date_license":""};
  carrodatos = {"id_driver":"","car":"","car_model":"","year":"","plates":"","circulation_card":""};
  userid: any;
  datos: any = [];
  datoscarro: any = [];
  userDetails: any;
  //nullea todos los campos para no ser editados
  ocultar1: boolean = true;
  ocultar2: boolean = true;
  ocultar3: boolean = true;
  ocultar4: boolean = true;
  ocultar5: boolean = true;
  ocultar6: boolean = true;
  ocultar7: boolean = true;
  ocultar8: boolean = true;
  ocultar9: boolean = true;
  ocultar10: boolean = true;
  ocultar11: boolean = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private menu: MenuController, 
     public authService: AuthServiceProvider) {
  
      this.userid = this.navParams.get('userid');
      console.log(this.userid);
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  } 

  ngOnInit(){
    this.traerdatos();
  }

  traerdatos(){
   //trae los datos del conductor
   this.actualizar.id_driver = this.userid
    this.authService.postData(this.actualizar,'getDriver').then((result) => {
      this.datos = result;
     // console.log(this.datos); 
     //El array toma los datos cargados en la consulta para mostrarlos 
      this.actualizar.name = this.datos.name
      this.actualizar.email = this.datos.email
      this.actualizar.phone = this.datos.phone
      this.actualizar.adress = this.datos.adress
      this.actualizar.license = this.datos.license
      this.actualizar.date_license = this.datos.date_license
    }, (err) => {
      // Error log
      });
//tre los datos del carro del conductor
this.carrodatos.id_driver = this.userid;
this.authService.postData(this.carrodatos,'getCar').then((result) => {
  this.datoscarro = result;
 console.log(this.datoscarro); 
 //El array toma los datos cargados en la consulta para mostrarlos 
  this.carrodatos.car = this.datoscarro.car
  this.carrodatos.car_model = this.datoscarro.car_model
  this.carrodatos.year = this.datoscarro.year
  this.carrodatos.plates = this.datoscarro.plates
  this.carrodatos.circulation_card = this.datoscarro.circulation_card
}, (err) => {
  // Error log
  });

  }

}
