import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InspectionComponent } from './inspection/inspection.component';
import { TarjetaCreditoComponent } from './tarjeta-credito/tarjeta-credito.component';
import { SiniestrosSoatComponent } from './siniestros-soat/siniestros-soat.component';

const routes: Routes = [
  { path: 'index', component: InspectionComponent },
  { path: '', component: LoginComponent },
  { path: 'InspeccionFrontEnd/tarjeta-credito', component: TarjetaCreditoComponent },
  { path: 'InspeccionFrontEnd/siniestros-soat', component: SiniestrosSoatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
