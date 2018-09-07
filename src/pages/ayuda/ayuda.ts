import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  correo = {"email":"","body":""};
  responseDatas : any = [];
  //datos de correo
  i: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private menu: MenuController,
  public alertCtrl: AlertController,
  public authService: AuthServiceProvider) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Mensaje Enviado',
      subTitle: 'Gracias por su mensaje, se le responderá a la brevedad',
      buttons: ['Ok']
    });
    alert.present();
  }

  ngOnInit(){
    this.traerdatos();
  }

  traerdatos(){
   //trae los datos del conductor
   
  }

  send(){
    this.authService.postData(this.correo,'enviarCorreo').then((result) => {
      this.responseDatas = result;
      console.log("datos enviados!");
      this.i.reset();
      this.showAlert();
      this.traerdatos();
      
}, (err) => {
  // Error log
});

    
  }


}
