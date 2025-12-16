import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // 1. CAMBIO IMPORTANTE: Ahora apuntamos al "Portero" (index.php)
  // Esta es la única URL que necesitas ahora.
// Lo que debes poner (Correcto):
baseUrl = 'http://localhost/EloteAdmin_Linked/backend/index.php';

  constructor(private http: HttpClient) { }

  // 2. Pedimos los PRODUCTOS al enrutador
  getProductos(): Observable<any[]> {
    // Le decimos al index.php: "Oye, pásame a la ruta de productos"
    return this.http.get<any[]>(`${this.baseUrl}?route=productos`);
  }

  // 3. Pedimos los KPIs al enrutador
  getKpis(): Observable<any> {
    // Le decimos al index.php: "Oye, pásame a la ruta de kpis"
    return this.http.get<any>(`${this.baseUrl}?route=kpis`);
  }
}