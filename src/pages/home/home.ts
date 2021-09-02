import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu:MenuController) {

  }

  //Quando for entrar na pagina  desabilitar menu lateral
ionViewWillEnter(){
  this.menu.swipeEnable(false);
}

//quando sair da pagina habilita novamente o menu lateral
ionViewDidLeave(){
  this.menu.swipeEnable(true);
}

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage')
  }

}

