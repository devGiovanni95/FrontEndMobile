import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public CategoriaService: CategoriaService) {
    }
  /*
    ionViewDidLoad() {
        this.CategoriaService.findAll()
          .subscribe(this.callback);
          }

          //funcao de pegar a respota e mostrar na tela
    callback(response) {
      console.log(response);
    }*/

    ionViewDidLoad() {
      this.CategoriaService.findAll()
        .subscribe(
          //quando a requisicao da certo
          response => {
          console.log(response);
        },
        //quando a requisicao da algum erro
        error => {
            console.log(error);
        }
        );

        }

}
