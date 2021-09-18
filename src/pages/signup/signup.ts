import { EstadoDTO } from './../../models/estado.dto';
import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  //Criando variaveis 
  estados: EstadoDTO[];
  cidades: CidadeDTO[];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    //declarando as classes de serviços
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['1234', [Validators.required]],
      logradouro: ['Rua Vida', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }



  ionViewDidLoad() {
    console.log('Implementando metodo para busca do estado');
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;//resposta
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);//pegar primeiro o estado de id na posição 1
      this.updateCidades();
    },
    error => {})
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);//descelecionar o estado de posicao 1 definido como padrão
    },
    error => {} )
  }

  signupUser() {
    console.log("Enviou o form")
  }

}
