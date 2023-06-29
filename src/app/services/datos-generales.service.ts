import { Injectable } from '@angular/core';
import { datosGen } from '../models/datosGenerales'
import { AdminViewComponent } from '../admin-view/admin-view.component';

@Injectable({
  providedIn: 'root'
})

export class DatosGeneralesService {
  
  datosGenerales = new datosGen;
  
  constructor() {
  }

  getDatosGenerales() {
    return this.datosGenerales;
  }

  postAnio(anioNuevo:string) {
    this.datosGenerales.anio = anioNuevo;
    console.log(this.datosGenerales)
    return this.datosGenerales.anio = anioNuevo;
  }

  putAnio(anioNuevo:string) {
    this.datosGenerales.anio = anioNuevo;
    console.log(this.datosGenerales.anio);
    return this.datosGenerales.anio = anioNuevo;
  }

  deleteCursos() {
    this.datosGenerales.anio = '';
    console.log(this.datosGenerales.anio);
    return this.datosGenerales.anio = '';
  }

}
