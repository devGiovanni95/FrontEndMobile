import { ProdutoDTO } from './../../models/produto.dto';
import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";
import { Cart } from '../../models/cart';

@Injectable()
export class CartService{

    constructor(public storage: StorageService){
    }

    //criando ou deletando carrinho vazio e armazenando no localStorage
    createOrClearCart() : Cart{
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    //retornar um cart novo ou que ja tenha sido criado
    getCart() : Cart{
        let cart: Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    //adicionar produto baseado na sua posição
    addProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex( x => x.produto.id == produto.id);
        if(position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }
}