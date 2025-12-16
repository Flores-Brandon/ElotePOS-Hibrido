import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // 1. Importante para que no falle el HTTP
import { DataService } from './data'; // 2. Corregimos el nombre: De 'Data' a 'DataService'

describe('DataService', () => {
  let service: DataService; // 3. Corregimos el tipo de variable

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // 4. Simulamos el módulo HTTP
      providers: [DataService]
    });
    service = TestBed.inject(DataService); // 5. Inyectamos la clase correcta
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});