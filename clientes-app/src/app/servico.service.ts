import { ServicoPrestadoBusca } from './servico/servico-lista/servicoBusca';
import { Observable } from 'rxjs';
import { Servico } from './servico/servico';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + '/api/servicos';

  constructor(private http: HttpClient) { }

  salvar(servico : Servico) : Observable<Servico>{
    return this.http.post<Servico>(this.apiURL, servico);
  }

  buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]> {
    const httpParams = new HttpParams()
      .set("nome", nome)
      .set("mes", mes ? mes.toString() : "");

    const url = this.apiURL + "?" + httpParams.toString();
    console.log(url);
    return this.http.get<any>(url)
  }

}
