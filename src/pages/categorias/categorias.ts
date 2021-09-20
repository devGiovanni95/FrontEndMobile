import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categorias.dto';
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

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

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
        //  console.log(response);
          this.items = response;
        },
        //quando a requisicao da algum erro
        error => {
           // console.log(error); mostra o erro no console
           //---> delegar esta funcao para a classe de interceptador de errors
        });

      }

      showProdutos(categoria_id : string){
        this.navCtrl.push('ProdutosPage',{cat_id: categoria_id});
      }

}
