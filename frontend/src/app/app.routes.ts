import { Routes } from '@angular/router';
import { AdminGraficasComponent } from './pages/admin-graficas/admin-graficas';

export const routes: Routes = [
  { path: 'admin', component: AdminGraficasComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full' } // Que sea la página principal
];