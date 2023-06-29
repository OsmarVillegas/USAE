import { Injectable } from '@angular/core';
import { Cursos } from '../models/cursos'
import { AdminViewComponent } from '../admin-view/admin-view.component';


@Injectable({
  providedIn: 'root'
})

export class CursosService {

  selectedCursos: Cursos;
  cursos: Cursos[] = [];

  constructor() {
    this.selectedCursos = new Cursos();
  }


  getCursos() {
    return this.cursos;
  }

  postCursos(cursos: Cursos) {
    cursos.cursosId = this.generateId(); // Generamos un ID único para el curso
    this.cursos.push(cursos); // Agregamos el curso al arreglo local
    return { success: true }; // Simulamos una respuesta exitosa
  }

  putCursos(cursos: Cursos) {
    const index = this.findIndexById(cursos.cursosId);
    if (index !== -1) {
      this.cursos[index] = cursos; // Actualizamos el cursos en el arreglo local
      return { success: true }; // Simulamos una respuesta exitosa
    }
    return { success: false }; // Simulamos una respuesta de error
  }

  deleteCursos(cursosId: string) {
    const index = this.findIndexById(cursosId);
    if (index !== -1) {
      this.cursos.splice(index, 1); // Eliminamos el cursos del arreglo local
      return { success: true }; // Simulamos una respuesta exitosa
    }
    return { success: false }; // Simulamos una respuesta de error
  }

  private generateId(): string {
    // Generamos un ID único utilizando la fecha actual y un número aleatorio
    const timestamp = new Date().getTime().toString();
    const randomNumber = Math.floor(Math.random() * 1000).toString();
    return timestamp + randomNumber;
  }

  private findIndexById(cursosId: string): number {
    // Buscamos el índice del cursos en el arreglo local basándonos en el ID
    return this.cursos.findIndex(cursos => cursos.cursosId === cursosId);
  }
}
