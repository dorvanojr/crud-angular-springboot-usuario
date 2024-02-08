import { LayoutComponent } from '../layout/layout.component';
import { ServicoListaComponent } from './servico-lista/servico-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoFormComponent } from './servico-form/servico-form.component';

import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'servico-prestado', component: LayoutComponent, canActivate: [AuthGuard], children:[
    {path: 'form', component: ServicoFormComponent},
    {path: 'lista', component: ServicoListaComponent},
    {path: '', redirectTo: '/servico-prestado/lista', pathMatch: 'full'}
  ]}
  

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
