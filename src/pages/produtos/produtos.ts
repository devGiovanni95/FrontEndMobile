import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  /*loadData() {
    let categoria_id = this.navParams.get(`cat_id`);
    let loader = this.presentLoading();//chamando a janela de carregamento
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        this.items = this.items.concat(response['content']);
        loader.dismiss();//fechar janela  de carregamento quando vier a resposta da pagina
        console.log(this.page);
        console.log(this.items);

        this.loadImageUrls();
      },
        error => {
          loader.dismiss();//se der erro fechar a janela tambem
        });
  }*/

  loadData() {
    let categoria_id = this.navParams.get(`cat_id`);
    let loader = this.presentLoading();//chamando a janela de carregamento
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length -1;

          loader.dismiss();//fechar janela  de carregamento quando vier a resposta da pagina
        console.log(this.page);
        console.log(this.items);

        this.loadImageUrls(start, end);
      },
        error => {
          loader.dismiss();//se der erro fechar a janela tambem
        });
  }

  /*  loadImageUrls() {
      for (var i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        this.produtoService.getSmallImageFromBucket(item.id)
          .subscribe(response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
          },
            error => { });
  
      }
    }*/

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });

    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait....",
      // duration:3000
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
