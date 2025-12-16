import { Component, OnInit, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { DataService } from '../../services/data'; 

@Component({
  selector: 'app-admin-graficas',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './admin-graficas.html',
  styleUrl: './admin-graficas.css'
})
export class AdminGraficasComponent implements OnInit {
  
  // Inyectamos el servicio
  private dataService = inject(DataService);

  // --- VARIABLES PARA LAS TARJETAS (KPIs) ---
  public kpiTotalProductos: number = 0;
  public kpiPrecioPromedio: number = 0;
  public kpiProductoTop: string = 'Cargando...';
  public kpiPrecioTop: number = 0;
  public kpiVentasHoy: number = 0; // Variable para el dinero de hoy

  // --- CONFIGURACIÓN GRÁFICA DE BARRAS ---
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Precio de Venta', backgroundColor: '#3498db' }
    ]
  };

  // --- CONFIGURACIÓN GRÁFICA DE LÍNEAS ---
  public lineChartData: ChartConfiguration['data'] = {
    labels: [], 
    datasets: [{
        data: [], 
        label: 'Ingresos ($)',
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderColor: '#27ae60',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#27ae60',
        fill: 'origin',
      }]
  };
  public lineChartOptions: ChartConfiguration['options'] = { 
    responsive: true, 
    maintainAspectRatio: false 
  };
  public lineChartType: ChartType = 'line';


  // --- AQUÍ OCURRE LA MAGIA ---
  ngOnInit(): void {
    
    // 1. LLAMADA PARA LA GRÁFICA DE BARRAS (Productos)
    this.dataService.getProductos().subscribe({
      next: (datosBackend) => {
        const nombres = datosBackend.map(item => item.Nombre);
        const precios = datosBackend.map(item => parseFloat(item.PrecioVenta));

        this.barChartData = {
          labels: nombres,
          datasets: [
            { data: precios, label: 'Precio de Venta', backgroundColor: '#e67e22' } 
          ]
        };
      },
      error: (error) => console.error('Error productos:', error)
    });

    // 2. LLAMADA PARA LAS TARJETAS Y GRÁFICA DE LINEAS (KPIs)
    this.dataService.getKpis().subscribe({
      next: (datos) => {
        console.log('KPIs recibidos:', datos);
        
        // A. Asignamos los datos a las tarjetas
        this.kpiTotalProductos = datos.total_productos;
        this.kpiPrecioPromedio = datos.precio_promedio;
        this.kpiProductoTop = datos.producto_top;
        this.kpiPrecioTop = datos.precio_top;
        this.kpiVentasHoy = datos.ventas_hoy; 

        // B. Actualizamos la Gráfica de Líneas
        if(datos.grafica_fechas && datos.grafica_totales) {
            this.lineChartData = {
                labels: datos.grafica_fechas, 
                datasets: [{
                    data: datos.grafica_totales, 
                    label: 'Ingresos ($)',
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: '#27ae60',
                    fill: 'origin',
                }]
            };
        }
      },
      error: (error) => console.error('Error KPIs:', error)
    }); // Cierre del subscribe

  } // Cierre del ngOnInit

} // Cierre de la clase AdminGraficasComponent