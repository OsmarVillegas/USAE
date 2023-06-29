import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Cursos} from '../models/cursos';
import { CursosService } from '../services/cursos.service';
import { DatosGeneralesService } from '../services/datos-generales.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})

export class AdminViewComponent implements OnInit {

//Antigüedad
puntajeAnios: number[] = new Array(28).fill(0);
 
//Preparación académica
  prim1: number = 0;
  prim2: number = 0;
  prim3: number = 0;
  prim4: number = 0;
  prim5: number = 0;
  prim6: number = 0;
  totalPrim: number = 0;
  
  calcularTotalPrimaria() {
    this.totalPrim = +this.prim1 + +this.prim2 + +this.prim3 + +this.prim4 + +this.prim5 + +this.prim6;
  }

  sec1: number = 0;
  sec2: number = 0;
  sec3: number = 0;
  totalSec: number = 0;

  calcularTotalSecundaria(){
    this.totalSec = +this.sec1 + +this.sec2 + +this.sec3;
  }

  bach1: number = 0;
  bach2: number = 0;
  bach3: number = 0;
  totalBach: number = 0;

  calcularTotalBachillerato(){
    this.totalBach = +this.bach1 + +this.bach2 + +this.bach3;
  }
  
  lic1: number = 0;
  lic2: number = 0;
  lic3: number = 0;
  lic4: number = 0;
  totalLic: number = 0;

  calcularTotalLicenciatura(){
    this.totalLic = +this.lic1 + +this.lic2 + +this.lic3 + +this.lic4;
  }
  
  //Cursos
  constructor(public cursosService: CursosService, public datosGenerales: DatosGeneralesService ) { }
  
  ngOnInit() {
  this.getCursos();
   }

   addCursos(form: NgForm) {
    if (form.value.cursosId) {
      this.cursosService.putCursos(form.value);
    } else {
      this.cursosService.postCursos(form.value);
    }
    this.resetForm(form);
  }
  
  
  getCursos() {
    return this.cursosService.getCursos();
  }
  
  editCursos(cursos: Cursos) {
    this.cursosService.selectedCursos = cursos;
  }
  
  deleteCursos(cursosId: string) {
    if (confirm('¿Está seguro que desea eliminarlo?')) {
      this.cursosService.deleteCursos(cursosId);
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
  }

  getTotalCursos(): number {
    let totalCursos = 0;
    for (let curso of this.cursosService.cursos) {
      totalCursos += +curso.puntaje;
    }
    return totalCursos;
  }

  getDatosGenerales() {
    const anio = document.getElementById('anio') as HTMLInputElement;
    this.datosGenerales.postAnio(anio.value);
  }

}
