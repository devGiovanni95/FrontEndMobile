import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {

    /* console.log('ionViewDidLoad PickAddressPage');
        Dados mocados 


    this.items = [
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Mônica",
        cep: "482938822",
        cidade: {
          id: "1",
          nome: "Uberlândia",
          estado: {
            id: "1",
            nome: "Minas Gerais"

          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Alexandre Toledo da Silca",
        numero: "405",
        complemento: null,
        bairro: "Centro",
        cep: "88933822",
        cidade: {
          id: "3",
          nome: "São Paulo",
          estado: {
            id: "2",
            nome: "São Paulo"

          }
        }

      }];*/

    let LocalUser = this.storage.getLocalUser();
    if (LocalUser && LocalUser.email) {
      //this.email = LocalUser.email;
      this.clienteService.findByEmail(LocalUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];//nao utilizamos o (cliente.enderecos) pois seria obrigatorio ter enderecos cadastrados utilizando [] nao é obrigatorio 

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => { return { quantidade: x.quantidade, produto: { id: x.produto.id } } }) //funcao que percorre o carrinho e mapeia os dados retornando somente a quantidade e o id do cliente utilizando lambda
          }

        },
          error => {
            if (error.status == 403) {
              this.navCtrl.setRoot('HomePage');
            }
          });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id};
   // console.log(this.pedido)
   this.navCtrl.push('PaymentPage', {pedido: this.pedido})
  }

}
