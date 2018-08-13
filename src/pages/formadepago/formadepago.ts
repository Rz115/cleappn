import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { NuevaTarjetaPage } from '../nueva-tarjeta/nueva-tarjeta';

import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-formadepago',
  templateUrl: 'formadepago.html',
})
export class FormadepagoPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private menu: MenuController,
    private payPal: PayPal) {}

    comprarpaypal(){
      this.payPal.init({
        PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        PayPalEnvironmentSandbox: 'ATkkbT2la5FR6zVVpgOOON5uNCWfHH7G5Xa8V39ojuhv_gcGT9nJg8uK1QVzsNhIGmnT0AyfLLBAOOJ5'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          
          acceptCreditCards: false,
          languageOrLocale: "en_AU" && "es",
          merchantPrivacyPolicyURL: '',
          merchantUserAgreementURL: ''
          
        })).then(() => {
          let payment = new PayPalPayment('1.00', 'USD', 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((response) => {
            console.log('Su pago ha sido realizado')
            // Successfully paid

            // Example sandbox response
            //
            // {
            //   "client": {
            //     "environment": "sandbox",
            //     "product_name": "PayPal iOS SDK",
            //     "paypal_sdk_version": "2.16.0",
            //     "platform": "iOS"
            //   },
            //   "response_type": "payment",
            //   "response": {
            //     "id": "PAY-1AB23456CD789012EF34GHIJ",
            //     "state": "approved",
            //     "create_time": "2016-10-03T13:33:33Z",
            //     "intent": "sale"
            //   }
            // }
          }, () => {
            console.log('Error al realizar el pago');
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });
    }

    ionViewDidEnter(){
      this.menu.swipeEnable(false);
    }
  nuevacard(){
    this.navCtrl.push(NuevaTarjetaPage);
}
}
