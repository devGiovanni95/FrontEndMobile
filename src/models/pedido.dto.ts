import { ItemPedidoDTO } from './item-pedido.dto';
import { PagamentoDTO } from './pagamento.dto';
import { RefDTO } from './ref.dto';

export interface PedidoDTO {
    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[];
}
/*
  {
      "clientes" : {"id":1},
      "enderecoDeEntrega" : {"id": 1},
      "pagamento" : {
          "numeroDeParcelas" : 10,
          "@type": "pagamentoComCartao"
      },
      "items" : [
          {
          "quantidade": 2,
          "produto" : {"id":3}
          },
          {
           "quantidade": 2,
           "produto" : {"id":1}
          }
      ]

  }

 */