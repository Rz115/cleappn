import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-perfilconductor',
  templateUrl: 'perfilconductor.html',
})
export class PerfilconductorPage {

  //variable que guarda todos los datos
  actualizar = {"name":"","email":"","phone":"","adress":"","license":"","date_license":""};
  carrodatos = {"car":"","car_model":"","year":"","plates":"","circulation_card":""};
  userid: number;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController,
    public http: Http, public authService: AuthServiceProvider) {
  
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
    this.authService.getdriver().subscribe(
      data => {
        for (var i=0; i<=this.userid; i++){
          if(this.userid == this.userid){
          
            this.actualizar = data.feedDatas[i]
              }}},
      err => {
        console.log(err)
      }
    )
//tre los datos del carro del conductor
this.authService.getCar().subscribe(
  data => {
    for (var i=0; i<=this.userid; i++){
      if(this.userid == this.userid){
      
        this.carrodatos = data.feedDatas[i]
      }}},
  err => {
    console.log(err)
  }
)


  }

}
