import { ServicoPrestadoBusca } from './servicoBusca';
import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from '../../servico.service';

@Component({
  selector: 'app-servico-lista',
  templateUrl: './servico-lista.component.html',
  styleUrls: ['./servico-lista.component.css']
})
export class ServicoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  lista: ServicoPrestadoBusca[];
  message: string;

  constructor(
    private service : ServicoPrestadoService
  ) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngOnInit(): void {
  }

  consultar(){
    this.service.buscar(this.nome, this.mes)
      .subscribe(response => {
        this.lista = response;
        if(this.lista.length <= 0){
          this.message = "Nenhum registro encontrado";
        } else {
          this.message = null;
        }
      });
  }

}
