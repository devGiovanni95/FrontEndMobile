import { ProdutoDTO } from './../../models/produto.dto';
import { CartService } from './../../services/domain/cart.service';
import { ProdutoService } from './../../services/domain/produto.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CartPage');

    let cart = this.cartService.getCart();
    let loader = this.presentLoading();
    this.items = cart.items;
    this.loadImageUrls();
    loader.dismiss();
  }

  //Pra carregar as imagens no carrinho
  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
          error => {});
    }
  }

  removeItem(produto: ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number{
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    this.navCtrl.push('PickAddressPage')
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
