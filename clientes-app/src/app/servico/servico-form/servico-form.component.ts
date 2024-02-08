import { Servico } from '../servico';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestadoService } from '../../servico.service';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: Servico;
  success: boolean = false;
  errors: String[];

  constructor(
    private clienteService : ClientesService,
    private service : ServicoPrestadoService
  ) {
    this.servico = new Servico();
   }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe( response => this.clientes = response)
  }

  onSubmit(){
    this.service
      .salvar(this.servico)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.servico = new Servico();
      }, errorResponse => { 
        this.success = false;
        this.errors = errorResponse.error.errors;
      }
      )
  }

}
