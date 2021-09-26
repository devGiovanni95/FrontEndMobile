import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdutoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public produtoService: ProdutoService,
     public cartService: CartService,
     public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
 /*   console.log('ionViewDidLoad ProdutoDetailPage');

    this.item = {
      id: "1",
      nome: "Mouse",
      preco: 80.59
    }*/
 
    let produto_id = this.navParams.get('produto_id');
    let loader = this.presentLoading();
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageIfExists();
        loader.dismiss();
      },
      error => {
        loader.dismiss();

      });
  }
  getImageIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(produto: ProdutoDTO){
    this.cartService.addProduto(produto);
   // let loader = this.presentLoading();
    this.navCtrl.setRoot('CartPage');
    //loader.dismiss();

  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Please wait....",
     // duration:3000
    });
    loader.present();
    return loader;
  }

}
