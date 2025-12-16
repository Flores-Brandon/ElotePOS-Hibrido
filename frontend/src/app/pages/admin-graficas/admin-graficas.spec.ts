import { ComponentFixture, TestBed } from '@angular/core/testing';
// 1. Aquí corregimos el nombre de la importación
import { AdminGraficasComponent } from './admin-graficas';
// 2. Importamos esto para evitar errores de "No provider for Charts" en las pruebas
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('AdminGraficasComponent', () => {
  let component: AdminGraficasComponent; // 3. Corregimos el tipo aquí
  let fixture: ComponentFixture<AdminGraficasComponent>; // 4. Y aquí

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGraficasComponent], // 5. Y aquí
      providers: [provideCharts(withDefaultRegisterables())] // Configuración para gráficas
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGraficasComponent); // 6. Y aquí
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});