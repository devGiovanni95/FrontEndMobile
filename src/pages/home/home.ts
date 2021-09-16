import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  //Quando for entrar na pagina  desabilitar menu lateral
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //quando sair da pagina habilita novamente o menu lateral
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  //
  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {/*Subscrever para receber uma resposta*/
      // console.log(response.headers.get('Authorization'));/*Se passar pela verificacao imprima a autorização*/
      this.auth.successfulLogin(response.headers.get('Authorization'));/*Se passar pela verificacao imprima a autorização*/
      this.navCtrl.setRoot('CategoriasPage')/**Va para a proxima pasta sobrepondo */
    },
      error => { });/**se der erro nao faca nada */
  // console.log(this.creds);
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {/*Subscrever para receber uma resposta*/
        // console.log(response.headers.get('Authorization'));/*Se passar pela verificacao imprima a autorização*/
        this.auth.successfulLogin(response.headers.get('Authorization'));/*Se passar pela verificacao imprima a autorização*/
        this.navCtrl.setRoot('CategoriasPage')/**Va para a proxima pasta sobrepondo */
      },
        error => { });/**se der erro nao faca nada */
    // console.log(this.creds);
  }

}

