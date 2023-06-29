import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { centros } from '../models/centros';
import { Formulario } from './Funciones/form-data.interface';
import { Personal, personal } from '../models/personal';
import {
  validaciones,
  validezFormulario,
  getValues,
} from './Funciones/form-validación';
import { controlarFormulario } from './Funciones/form-controlarFormulario';
import { aniosDeAntiguedad } from './Funciones/funcionesTransformacion';

import { ToastrService } from 'ngx-toastr';
import { Renderer2 } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css'],
})
export class Form2Component implements OnInit {
  @ViewChild('informacion') modalElement!: ElementRef;

  // Definición del formulario para agregar, editar y elminar información
  form: Formulario;

  // Variables que se utilizan para calcular información del documento
  sumaPuntaje: number = 0;
  currentYear!: number;
  desempeno!: number;
  multiPuntajeyDias!: number;
  antiguedad!: number;
  academico!: number;
  periodo!: string;
  resultt!: string;

  // Variables para manipular la información almacenada
  registros!: any[];
  centros = [...centros];
  aniosAntiguedad: Number = 0;

  // Variables para manipular el HTML
  modal: boolean = false;
  BotonAgregar: boolean = true;
  activado: boolean = true;
  desactivar: boolean = true;
  nuevosRegistros: number = 0;
  modificarRegistro: boolean = false;

  // Funciones
  protected instanciaControlarFormulario: controlarFormulario;

  // Define el valor por default para visualizar la información
  registroParaLaVisualizacion = {
    id: 0,
    rfc: '',
    nombrepersonal: '',
    seccionsindical: '',
    funcion: '',
    clavecentro: '',
    centrotrabajo: '',
    tipoCentro: '',
    municipio: 'Irapuato',
    telefonocentro: '',
    evaluador: '',
    fechaFormateada: '',
    dias: 0,
    puntajeComp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    resultadototal: 0,
    multiPuntajeyDias: 0,

    desempeno: 0,
    antiguedad: '',
    academico: '',
    cursos: '',
    puntaje: '',
    observaciones: '',
    nuevo: true,
  };

  // Obtener la fecha actual del sistema
  fechaActual = new Date();
  // Obtener solo el dia, mes y año
  dia = this.fechaActual.getDate();
  mes = this.fechaActual.getMonth() + 1;
  anio = this.fechaActual.getFullYear();
  // Asignarlo a la variable fechaFormateada
  fechaFormateada = `${this.dia.toString().padStart(2, '0')}/${this.mes
    .toString()
    .padStart(2, '0')}/${this.anio}`;

  constructor(private toastr: ToastrService, private renderer: Renderer2) {
    this.instanciaControlarFormulario = new controlarFormulario(
      this.toastr,
      this.renderer
    );

    // Obtiene el año actual del sistema
    this.currentYear = new Date().getFullYear();
    // Concatena los meses del periodo con el año actual -1
    this.periodo = 'Enero-Diciembre ' + (this.currentYear - 1);
    // Recupera los datos del LocalStorage al inicializar el componente
    const storedData = localStorage.getItem('registros');
    // Si hay datos almacenados, conviértelos de nuevo a un objeto o matriz JSON
    this.registros = storedData ? JSON.parse(storedData) : [];

    this.registros.length >= 1
      ? (this.form = {
          id: this.registros[this.registros.length - 1].id + 1,
          etapa: '',
          resultadoTotal: 0,
          observaciones: '',
          nombrepersonal: '',
          seccionsindical: 0,
          tipoCentro: this.registros[0].tipoCentro,
          rfc: '',
          inicioperiodo: '',
          finperiodo: '',
          centrotrabajo: this.registros[0].centrotrabajo,
          evaluador: this.registros[0].evaluador,
          periodoevaluado: '',
          municipio: this.registros[0].municipio,
          funcion: '',
          clavecentro: this.registros[0].clavecentro,
          telefonocentro: '',
          dias: 365,
          cursos: 0,
          nuevo: true,
          notificacionNuevo: true,
          multiPuntajeyDias: 0,

          puntajeComp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          // puntajeComp: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        })
      : (this.form = {
          id: 0,
          etapa: '',
          resultadoTotal: 0,
          observaciones: '',
          nombrepersonal: '',
          seccionsindical: 0,
          tipoCentro: '',
          rfc: '',
          inicioperiodo: '',
          finperiodo: '',
          centrotrabajo: '',
          evaluador: '',
          periodoevaluado: '',
          municipio: 'Irapuato',
          funcion: '',
          clavecentro: '',
          telefonocentro: '',
          dias: 365,
          cursos: 0,
          nuevo: true,
          notificacionNuevo: true,
          multiPuntajeyDias: 0,

          puntajeComp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
  }

  autocompletarNombre() {
    const rfc = this.form.rfc;

    // Buscar el personal en la lista a partir del RFC ingresado
    const personalEncontrado = personal.find((p: Personal) => p.RFC === rfc);

    if (personalEncontrado) {
      this.form.nombrepersonal = personalEncontrado.Nombre;
    } else {
      this.form.nombrepersonal = '';
    }
  }

  // Clave de centro codigo
  onClaveCentroChange() {
    const selectedClave = this.form.clavecentro;
    const selectedCentro = this.centros.find(
      (centro) => centro.clave_de_centro === selectedClave
    );
    if (selectedCentro) {
      this.form.centrotrabajo = selectedCentro.centro_de_trabajo;
    } else {
      this.form.centrotrabajo = '';
    }
  }

  // Obtener la cantidad de nuevos registros
  contarNuevosRegistros() {
    this.nuevosRegistros = 0;

    this.registros.every((elemento) => {
      if (elemento.nuevo === true) {
        this.nuevosRegistros++;
      }
      return elemento;
    });
  }

  // Marcar los mensajes nuevos como leidos
  marcarMensajeComoLeido() {
    console.log(this.registros);

    for (let i = 0; i <= this.registros.length - 1; i++) {
      this.registros[i].nuevo = false;
    }

    localStorage.setItem('registros', JSON.stringify(this.registros));
  }

  EliminarEtiquetasNuevoRegistro() {
    for (let i = 0; i <= this.registros.length - 1; i++) {
      this.registros[i].notificacionNuevo = false;
    }

    localStorage.setItem('registros', JSON.stringify(this.registros));
  }

  ngOnInit() {
    this.modificarRegistro = false;
    this.BotonAgregar = true;

    setInterval(() => {
      this.activado = this.instanciaControlarFormulario.BloqueoInteligente(
        this.registros
      );
      this.evaluar();
      this.calcularSumaPuntajes();
      this.sumarTodo();
      this.contarNuevosRegistros();
    }, 1000);
  }

  // Ocultar el botón
  botonAgregarOcultar() {
    this.BotonAgregar = false;
  }

  botonAgregarMostrar() {
    var myModalEl = document.getElementById('informacion');

    this.renderer.listen(myModalEl, 'hidden.bs.modal', () => {
      this.BotonAgregar = true;
    });
  }

  evaluar(): void {
    getValues();
    this.modal = validezFormulario.every((val) => val);
  }

  comprobar(): void {
    validaciones();
    const validez = validezFormulario.every((val) => val);
    const valueWrong: number[] = [];

    // El siguiente for identifica los inputs que generan errores y los agrega a un array.
    for (let i = 0; i < validezFormulario.length; i++) {
      if (validezFormulario[i] === false) {
        valueWrong.push(i);
      }
    }

    // El siguiente for se reliza el envio de todos los mensajes de error generados.
    for (let i = valueWrong.length; i >= 0; i--) {
      switch (valueWrong[i]) {
        case 0:
          this.toastr.error(
            'El campo RFC con homoclave de la convocatoria no ha sido llenado',
            'RFC con homoclave',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 1:
          this.toastr.error(
            'El campo nombre del personal no ha sido llenado',
            'Nombre del personal',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 2:
          this.toastr.error(
            'El campo sección sindical no ha sido llenado',
            'Sección sindical',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 3:
          this.toastr.error('El campo función no ha sido llenado', 'Función', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          break;
        case 4:
          this.toastr.error(
            'El campo clave de centro de trabajo no ha sido llenado',
            'Clave de centro de trabajo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 5:
          this.toastr.error(
            'El campo tipo de centro de trabajo no ha sido llenado',
            'Tipo de centro de trabajo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 6:
          this.toastr.error(
            'El campo teléfono de su centro de trabajo no ha sido llenado',
            'Teléfono de su centro de trabajo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 7:
          this.toastr.error(
            'El campo nombre del evaluador no ha sido llenado',
            'Nombre del evaluador',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 8:
          this.toastr.error(
            'El campo días laborados no ha sido llenado',
            'Días laborados',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 9:
          this.toastr.error(
            'El campo de la tabla con la competencia logros de resultados no ha sido llenado',
            'Logros de resultados',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 10:
          this.toastr.error(
            'El campo de la tabla con la competencia iniciativa no ha sido llenado',
            'Iniciativa',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 11:
          this.toastr.error(
            'El campo de la tabla con la competencia relaciones interpersonales no ha sido llenado',
            'Relaciones Interpersonales',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 12:
          this.toastr.error(
            'El campo de la tabla con la competencia actitud de servicio no ha sido llenado',
            'Actitud de Servicio',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 13:
          this.toastr.error(
            'El campo de la tabla con la competencia trabajo en equipo no ha sido llenado',
            'Trabajo en equipo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 14:
          this.toastr.error(
            'El campo de la tabla con la competencia disponibilidad no ha sido llenado',
            'Disponibilidad',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 15:
          this.toastr.error(
            'El campo de la tabla con la competencia uso de recursos no ha sido llenado',
            'Uso de recursos',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 16:
          this.toastr.error(
            'El campo de la tabla con la competencia administración del tiempo no ha sido llenado',
            'Administración del tiempo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 17:
          this.toastr.error(
            'El campo de la tabla con la competencia conocimiento del trabajo no ha sido llenado',
            'Conocimiento del trabajo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 18:
          this.toastr.error(
            'El campo de la tabla con la competencia comunicación no ha sido llenado',
            'Comunicación',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 19:
          this.toastr.error(
            'El campo años de antigüedad no ha sido llenado',
            'Años de antigüedad',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 20:
          this.toastr.error(
            'El campo grado educativo no ha sido llenado',
            'Grado educativo',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          break;
        case 21:
          this.toastr.error('El campo cursos no ha sido llenado', 'Cursos', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          break;
        default:
          break;
      }
    }

    // El siguiente switch dirige al usuario a la ubicación.
    switch (valueWrong[0]) {
      case 0:
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const rfcFocus = document.getElementById('rfc');
        const rfcFocusElement = rfcFocus as HTMLInputElement;

        rfcFocusElement.focus();

        break;
      case 1:
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const nombrePFocus = document.getElementById('nombrePersonal');
        const nombrePFocusElement = nombrePFocus as HTMLInputElement;

        nombrePFocusElement.focus();
        break;
      case 2:
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const secSindical = document.getElementById('seccionSindical');
        const secSindicalElement = secSindical as HTMLInputElement;

        secSindicalElement.focus();
        break;
      case 3:
        window.scrollTo({ top: 100, behavior: 'smooth' });

        const funcFocus = document.getElementById('funcion');
        const funcFocusElement = funcFocus as HTMLInputElement;

        funcFocusElement.focus();

        break;
      case 4:
        window.scrollTo({ top: 100, behavior: 'smooth' });

        const claveCentFocus = document.getElementById('clavecentro');
        const claveCentFocusElement = claveCentFocus as HTMLInputElement;

        claveCentFocusElement.focus();

        break;
      case 5:
        window.scrollTo({ top: 100, behavior: 'smooth' });

        const tipoCentFocus = document.getElementById('tipoCentro');
        const tipoCentFocusElement = tipoCentFocus as HTMLInputElement;

        tipoCentFocusElement.focus();

        break;
      case 6:
        window.scrollTo({ top: 250, behavior: 'smooth' });

        const telFocus = document.getElementById('telefono');
        const telFocusElement = telFocus as HTMLInputElement;

        telFocusElement.focus();

        break;
      case 7:
        window.scrollTo({ top: 350, behavior: 'smooth' });

        const nomEvalFocus = document.getElementById('nombreEvaluador');
        const nomEvalFocusElement = nomEvalFocus as HTMLInputElement;

        nomEvalFocusElement.focus();

        break;
      case 8:
        window.scrollTo({ top: 750, behavior: 'smooth' });

        const diasFocus = document.getElementById('dias');
        const diasFocusElement = diasFocus as HTMLInputElement;

        diasFocusElement.focus();

        break;
      case 9:
        window.scrollTo({ top: 1150, behavior: 'smooth' });

        const punt1Focus = document.getElementById('puntajeComp1');
        const punt1FocusElement = punt1Focus as HTMLInputElement;

        punt1FocusElement.focus();

        break;
      case 10:
        window.scrollTo({ top: 1150, behavior: 'smooth' });

        const punt2Focus = document.getElementById('puntajeComp2');
        const punt2FocusElement = punt2Focus as HTMLInputElement;

        punt2FocusElement.focus();

        break;
      case 11:
        window.scrollTo({ top: 1150, behavior: 'smooth' });

        const punt3Focus = document.getElementById('puntajeComp3');
        const punt3FocusElement = punt3Focus as HTMLInputElement;

        punt3FocusElement.focus();

        break;
      case 12:
        window.scrollTo({ top: 1150, behavior: 'smooth' });

        const punt4Focus = document.getElementById('puntajeComp4');
        const punt4FocusElement = punt4Focus as HTMLInputElement;

        punt4FocusElement.focus();

        break;
      case 13:
        window.scrollTo({ top: 1250, behavior: 'smooth' });

        const punt5Focus = document.getElementById('puntajeComp5');
        const punt5FocusElement = punt5Focus as HTMLInputElement;

        punt5FocusElement.focus();

        break;
      case 14:
        window.scrollTo({ top: 1250, behavior: 'smooth' });

        const punt6Focus = document.getElementById('puntajeComp6');
        const punt6FocusElement = punt6Focus as HTMLInputElement;

        punt6FocusElement.focus();

        break;
      case 15:
        window.scrollTo({ top: 1450, behavior: 'smooth' });

        const punt7Focus = document.getElementById('puntajeComp7');
        const punt7FocusElement = punt7Focus as HTMLInputElement;

        punt7FocusElement.focus();

        break;
      case 16:
        window.scrollTo({ top: 1450, behavior: 'smooth' });

        const punt8Focus = document.getElementById('puntajeComp8');
        const punt8FocusElement = punt8Focus as HTMLInputElement;

        punt8FocusElement.focus();

        break;
      case 17:
        window.scrollTo({ top: 1550, behavior: 'smooth' });

        const punt9Focus = document.getElementById('puntajeComp9');
        const punt9FocusElement = punt9Focus as HTMLInputElement;

        punt9FocusElement.focus();

        break;
      case 18:
        window.scrollTo({ top: 1550, behavior: 'smooth' });

        const punt10Focus = document.getElementById('puntajeComp10');
        const punt10FocusElement = punt10Focus as HTMLInputElement;

        punt10FocusElement.focus();

        break;
      case 19:
        window.scrollTo({ top: 2250, behavior: 'smooth' });

        const antiguedadFocus = document.getElementById('antiguedad');
        const antiguedadFocusElement = antiguedadFocus as HTMLInputElement;

        antiguedadFocusElement.focus();

        break;
      case 20:
        window.scrollTo({ top: 2350, behavior: 'smooth' });

        const academicoFocus = document.getElementById('academico');
        const academicoFocusElement = academicoFocus as HTMLInputElement;

        academicoFocusElement.focus();

        break;
      case 21:
        window.scrollTo({ top: 2450, behavior: 'smooth' });

        const cursosFocus = document.getElementById('cursos');
        const cursosFocusElement = cursosFocus as HTMLInputElement;

        cursosFocusElement.focus();

        break;
      default:
        break;
    }
    this.calcularSumaPuntajes();
    this.sumarTodo();

    if (validez) {
      // this.generatePDF();
    }

    this.modal = validez;
  }

  enviarDatos() {
    // Obtén los valores de los campos
    var nuevoRegistro = {
      id: 0,
      nombrepersonal: this.form.nombrepersonal,
      centrotrabajo: this.form.centrotrabajo,
      tipoCentro: this.form.tipoCentro,
      clavecentro: this.form.clavecentro,
      seccionsindical: this.form.seccionsindical,
      evaluador: this.form.evaluador,
      rfc: this.form.rfc,
      municipio: this.form.municipio,
      funcion: this.form.funcion,

      telefonocentro: this.form.telefonocentro,
      fechaFormateada: this.fechaFormateada,
      puntajeComp: [
        this.form.puntajeComp[0],
        this.form.puntajeComp[1],
        this.form.puntajeComp[2],
        this.form.puntajeComp[3],
        this.form.puntajeComp[4],
        this.form.puntajeComp[5],
        this.form.puntajeComp[6],
        this.form.puntajeComp[7],
        this.form.puntajeComp[8],
        this.form.puntajeComp[9],
      ],

      sumaPuntaje: this.sumaPuntaje,
      dias: this.form.dias,
      desempeno: this.desempeno,
      multiPuntajeyDias: this.multiPuntajeyDias,
      antiguedad: this.antiguedad,
      academico: this.academico,
      cursos: this.form.cursos,
      resultadototal: this.resultt,
      observaciones: this.form.observaciones,
      nuevo: true,
      notificacionNuevo: true,
    };

    if (this.registros.length >= 1) {
      nuevoRegistro = {
        id: this.registros[this.registros.length - 1].id + 1,
        nombrepersonal: this.form.nombrepersonal,
        centrotrabajo: this.form.centrotrabajo,
        tipoCentro: this.form.tipoCentro,
        clavecentro: this.form.clavecentro,
        seccionsindical: this.form.seccionsindical,
        evaluador: this.form.evaluador,
        rfc: this.form.rfc,
        municipio: this.form.municipio,
        funcion: this.form.funcion,

        telefonocentro: this.form.telefonocentro,
        fechaFormateada: this.fechaFormateada,
        puntajeComp: [
          this.form.puntajeComp[0],
          this.form.puntajeComp[1],
          this.form.puntajeComp[2],
          this.form.puntajeComp[3],
          this.form.puntajeComp[4],
          this.form.puntajeComp[5],
          this.form.puntajeComp[6],
          this.form.puntajeComp[7],
          this.form.puntajeComp[8],
          this.form.puntajeComp[9],
        ],

        sumaPuntaje: this.sumaPuntaje,
        dias: this.form.dias,
        desempeno: this.desempeno,
        multiPuntajeyDias: this.multiPuntajeyDias,
        antiguedad: this.antiguedad,
        academico: this.academico,
        cursos: this.form.cursos,
        resultadototal: this.resultt,
        observaciones: this.form.observaciones,
        nuevo: true,
        notificacionNuevo: true,
      };
    }

    if (
      this.registros &&
      this.registros.length > 0 &&
      this.registros[0].centro
    ) {
      if (this.form.centrotrabajo === this.registros[0].centro) {
        // Agrega el nuevo dato a la variable datos
        this.registros.push(nuevoRegistro);
        // Guarda los datos actualizados en el LocalStorage
        localStorage.setItem('registros', JSON.stringify(this.registros));


        // Envia al usuario al inicio del formulario
        setTimeout(() => {
          window.scrollTo({ top: 180, behavior: 'smooth' });
        }, 300);

        // Notificación de llenado exitoso
        this.toastr.success(
          'El registro ha sido añadido correctamente.',
          'Registro exitoso',
          {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            progressBar: true,
          }
        );

        // Cerrar modal
        const modal = new bootstrap.Modal(this.modalElement.nativeElement);
        modal.hide();
        console.log('DATO AGREGADO');
      } else {
        console.log('NO SE AGREGO EL DATO');
      }
    } else {
      // Agrega el nuevo dato a la variable datos
      this.registros.push(nuevoRegistro);
      // Guarda los datos actualizados en el LocalStorage
      localStorage.setItem('registros', JSON.stringify(this.registros));
      console.log('DATO AGREGADO');

      
      setTimeout(() => {
        window.scrollTo({ top: 180, behavior: 'smooth' });
      }, 300);

      // Notificación de llenado exitoso
      this.toastr.success(
        'El registro ha sido añadido correctamente.',
        'Registro exitoso',
        {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
        }
      );

      // Cerrar modal
      const modal = new bootstrap.Modal(this.modalElement.nativeElement);
      modal.hide();


    }
  }

  eliminarRegistro(registro: any): void {
    const index = this.registros.indexOf(registro); // Obtener el índice del registro a eliminar
    if (index !== -1) {
      this.registros.splice(index, 1); // Eliminar el registro del arreglo

      const data = JSON.stringify(this.registros); // Convertir el arreglo actualizado a una cadena JSON
      localStorage.setItem('registros', data); // Guardar los datos actualizados en el localStorage
    }

    if (this.registros.length == 0) {
      // Limpia el formulario
      this.form = {
        id: this.registros[this.registros.length - 1].id + 1,
        etapa: '',
        resultadoTotal: 0,
        observaciones: '',
        nombrepersonal: '',
        seccionsindical: 0,
        tipoCentro: '',
        rfc: '',
        inicioperiodo: '',
        finperiodo: '',
        centrotrabajo: '',
        evaluador: '',
        periodoevaluado: '',
        municipio: 'Irapuato',
        funcion: '',
        clavecentro: '',
        telefonocentro: '',
        dias: 365,
        cursos: 0,
        multiPuntajeyDias: 0,

        puntajeComp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        nuevo: true,
        notificacionNuevo: true,
      };
      this.academico = 0;
      this.antiguedad = 0;
    }
    this.activado = this.instanciaControlarFormulario.BloqueoInteligente(
      this.registros
    );
  }

  eliminarTodosLosRegistros(): void {
    // Se vacia el array
    this.registros = [];

    // Limpia el formulario
    this.form = {
      id: 0,
      etapa: '',
      resultadoTotal: 0,
      observaciones: '',
      nombrepersonal: '',
      seccionsindical: 0,
      tipoCentro: '',
      rfc: '',
      inicioperiodo: '',
      finperiodo: '',
      centrotrabajo: '',
      evaluador: '',
      periodoevaluado: '',
      municipio: 'Irapuato',
      funcion: '',
      clavecentro: '',
      telefonocentro: '',
      dias: 365,
      cursos: 0,
      multiPuntajeyDias: 0,

      puntajeComp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // puntajeComp: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      nuevo: true,
      notificacionNuevo: true,
    };
    this.academico = 0;
    this.antiguedad = 0;

    // Envia al usuario al inicio del formulario
    setTimeout(() => {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }, 300);

    // Notificación de llenado exitoso
    this.toastr.success(
      'Se han eliminado todos los registros.',
      'Los registros han sido eliminados',
      {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
      }
    );

    // Se eliminan todos los demás registros
    localStorage.setItem('registros', JSON.stringify(this.registros));
  }

  visualizarRegistro(registro: any): void {
    const propiedadBuscada = 'id';
    const valorBuscado = registro.id;

    const objetoEncontrado = this.registros.find(
      (objeto) => objeto[propiedadBuscada] === valorBuscado
    );

    console.log(objetoEncontrado);

    this.registroParaLaVisualizacion = objetoEncontrado;

    this.aniosAntiguedad = aniosDeAntiguedad(
      Number(this.registroParaLaVisualizacion.antiguedad)
    );
  }

  // Reactiva el formulario, lo posiciona y lo rellena con la información seleccionada
  seleccionarParaEditarRegistro(): void {
    this.instanciaControlarFormulario.posicionarEditarFormulario();

    this.form = {
      id: this.registroParaLaVisualizacion.id,
      etapa: '',
      resultadoTotal: 0,
      observaciones: this.registroParaLaVisualizacion.observaciones,
      nombrepersonal: this.registroParaLaVisualizacion.nombrepersonal,
      seccionsindical: Number(this.registroParaLaVisualizacion.seccionsindical),
      tipoCentro: this.registroParaLaVisualizacion.tipoCentro,
      rfc: this.registroParaLaVisualizacion.rfc,
      inicioperiodo: '',
      finperiodo: '',
      centrotrabajo: this.registroParaLaVisualizacion.centrotrabajo,
      evaluador: this.registroParaLaVisualizacion.evaluador,
      periodoevaluado: '',
      municipio: this.registroParaLaVisualizacion.municipio,
      funcion: this.registroParaLaVisualizacion.funcion,
      clavecentro: this.registroParaLaVisualizacion.clavecentro,
      telefonocentro: this.registroParaLaVisualizacion.telefonocentro,
      dias: Number(this.registroParaLaVisualizacion.dias),
      cursos: Number(this.registroParaLaVisualizacion.cursos),
      multiPuntajeyDias: 0,

      puntajeComp: this.registroParaLaVisualizacion.puntajeComp,
      nuevo: true,
      notificacionNuevo: true,
    };
    this.academico = Number(this.registroParaLaVisualizacion.academico);
    this.antiguedad = Number(this.registroParaLaVisualizacion.antiguedad);

    // Activar botón de editado
    this.modificarRegistro = true;
  }

  editarRegistro() {
    // Eliminamos el registro seleccionado
    this.eliminarRegistro(this.registroParaLaVisualizacion);

    // Agregamos el nuevo registro
    // Obtén los valores de los campos
    const nuevoRegistro = {
      id: this.registros[this.registros.length - 1].id + 1,
      nombrepersonal: this.form.nombrepersonal,
      centrotrabajo: this.form.centrotrabajo,
      tipoCentro: this.form.tipoCentro,
      clavecentro: this.form.clavecentro,
      seccionsindical: this.form.seccionsindical,
      evaluador: this.form.evaluador,
      rfc: this.form.rfc,
      municipio: this.form.municipio,
      funcion: this.form.funcion,

      telefonocentro: this.form.telefonocentro,
      fechaFormateada: this.fechaFormateada,
      puntajeComp: [
        this.form.puntajeComp[0],
        this.form.puntajeComp[1],
        this.form.puntajeComp[2],
        this.form.puntajeComp[3],
        this.form.puntajeComp[4],
        this.form.puntajeComp[5],
        this.form.puntajeComp[6],
        this.form.puntajeComp[7],
        this.form.puntajeComp[8],
        this.form.puntajeComp[9],
      ],

      sumaPuntaje: this.sumaPuntaje,
      dias: this.form.dias,
      desempeno: this.desempeno,
      multiPuntajeyDias: this.multiPuntajeyDias,
      antiguedad: this.antiguedad,
      academico: this.academico,
      cursos: this.form.cursos,
      resultadototal: this.resultt,
      observaciones: this.form.observaciones,
      nuevo: true,
      notificacionNuevo: true,
    };

    // Agrega el nuevo dato a la variable datos
    this.registros.push(nuevoRegistro);

    // Guarda los datos actualizados en el LocalStorage
    localStorage.setItem('registros', JSON.stringify(this.registros));

    // Limpia el formulario
    this.form = {
      id: this.registros[this.registros.length - 1].id + 1,
      etapa: '',
      resultadoTotal: 0,
      observaciones: '',
      nombrepersonal: '',
      seccionsindical: 0,
      tipoCentro: this.registros[0].tipoCentro,
      rfc: '',
      inicioperiodo: '',
      finperiodo: '',
      centrotrabajo: this.registros[0].centrotrabajo,
      evaluador: this.registros[0].evaluador,
      periodoevaluado: '',
      municipio: this.registros[0].municipio,
      funcion: '',
      clavecentro: this.registros[0].clavecentro,
      telefonocentro: '',
      dias: 365,
      cursos: 0,
      multiPuntajeyDias: 0,

      puntajeComp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // puntajeComp: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      nuevo: true,
      notificacionNuevo: true,
    };
    this.academico = 0;
    this.antiguedad = 0;

    // Ocultar botón para quitar el modo edición
    this.cerrarModoEdicion();

    // Envia al usuario al inicio del formulario
    setTimeout(() => {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }, 300);

    // Notificación de llenado exitoso
    this.toastr.success(
      'El registro ha sido editado correctamente.',
      'Registro editado exitosamente',
      {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
      }
    );

    // Cerrar modal
    const modal = new bootstrap.Modal(this.modalElement.nativeElement);
    modal.hide();
  }

  cerrarModoEdicion() {
    this.toastr.info(
      'Ahora se pueden ingresar nuevos registros',
      'Se ha salido del modo edición',
      {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
      }
    );

    setTimeout(() => {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }, 100);

    this.modificarRegistro = false;

    // Limpia el formulario
    this.form = {
      id: this.registros[this.registros.length - 1].id + 1,
      etapa: '',
      resultadoTotal: 0,
      observaciones: '',
      nombrepersonal: '',
      seccionsindical: 0,
      tipoCentro: this.registros[0].tipoCentro,
      rfc: '',
      inicioperiodo: '',
      finperiodo: '',
      centrotrabajo: this.registros[0].centrotrabajo,
      evaluador: this.registros[0].evaluador,
      periodoevaluado: '',
      municipio: this.registros[0].municipio,
      funcion: '',
      clavecentro: this.registros[0].clavecentro,
      telefonocentro: '',
      dias: 365,
      cursos: 0,
      multiPuntajeyDias: 0,

      puntajeComp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // puntajeComp: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      nuevo: true,
      notificacionNuevo: true,
    };
    this.academico = 0;
    this.antiguedad = 0;
  }

  calcularSumaPuntajes(): void {
    this.sumaPuntaje = this.form.puntajeComp.reduce((a, b) => a + Number(b), 0);
    this.desempeno = this.sumaPuntaje / 365;
    this.multiPuntajeyDias = this.desempeno * this.form.dias;
  }

  sumarTodo(): void {
    this.form.resultadoTotal =
      Number(this.multiPuntajeyDias) +
      Number(this.antiguedad) +
      Number(this.academico) +
      Number(this.form.cursos);

    this.resultt = this.form.resultadoTotal.toFixed(2);
  }

  findKey(): void {
    this.centros.forEach((data) => {
      if (data.centro_de_trabajo === this.form.centrotrabajo) {
        this.form.clavecentro = data.clave_de_centro;
      }
    });
  }

  async generatePDF1(): Promise<void> {
    const existingPdfBytes = await fetch('../../assets/formats/tabla.pdf').then(
      (res) => res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Realiza las modificaciones en el documento pdfDoc, como agregar texto, imágenes, etc.

    const page1 = pdfDoc.getPage(0);
    const page2 = pdfDoc.getPage(1);

    // Obtener la fuente estándar Helvetica
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaFontBold = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    const nombrepersonal = [],
      resultadototal = [];
    for (const registro of this.registros) {
      nombrepersonal.push(registro.nombrepersonal);
      resultadototal.push(registro.resultadototal);
    }

    let y = page1.getHeight() - 126;
    let x = 117;
    let size = 7;

    for (let i = 0; i < nombrepersonal.length; i++) {
      const nombre = nombrepersonal[i];

      if (nombre.length >= 30 && nombre.length < 34) {
        size = 6.5;
      } else if (nombre.length >= 34) {
        size = 6;
      }

      page2.drawText(nombre, {
        x,
        y,
        size,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      y -= +14;

      if (i === 18) {
        // Cambiar la posición de x y y cuando el índice sea 2 (tercer elemento)
        x = 310; // Cambiar el valor de x
        y = page1.getHeight() - 126; // Cambiar el valor de y
      }
      size = 7;
    }

    x = 265;
    y = page1.getHeight() - 126;

    for (let i = 0; i < resultadototal.length; i++) {
      const puntaje = resultadototal[i];

      page2.drawText(puntaje, {
        x: x + 2,
        y,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      y -= +14;

      if (i === 18) {
        // Cambiar la posición de x y y cuando el índice sea 2 (tercer elemento)
        x = 460; // Cambiar el valor de x
        y = page1.getHeight() - 126; // Cambiar el valor de y
      }
    }

    const modifiedPdfBytes = await pdfDoc.save();

    // Descargar el archivo modificado
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registros';
    link.click();
  }

  async generateAllPDF(): Promise<void> {
    const existingPdfBytes = await fetch(
      '../../assets/formats/4factores.pdf'
    ).then((res) => res.arrayBuffer());

    for (const registro of this.registros) {
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaFontBold = await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );
      const page1 = pdfDoc.getPage(0);
      const page2 = pdfDoc.getPage(1);

      page1.drawText(registro.nombrepersonal, {
        x: 98,
        y: page1.getHeight() - 133,
        size: 7,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });

      if (registro.centrotrabajo.length >= 60) {
        page1.drawText(registro.centrotrabajo, {
          x: 327,
          y: page1.getHeight() - 132.5,
          size: 4.5,
          font: helveticaFont,
          color: rgb(0, 0, 0.5),
        });
      } else {
        page1.drawText(registro.centrotrabajo, {
          x: 327,
          y: page1.getHeight() - 132.5,
          size: 6,
          font: helveticaFont,
          color: rgb(0, 0, 0.5),
        });
      }

      if (Number(registro.seccionsindical) === 45) {
        // 45
        page1.drawText(`X`, {
          x: 113,
          y: page1.getHeight() - 150,
          size: 8,
          font: helveticaFontBold,
          color: rgb(0, 0, 0.5),
        });
      } else {
        // 13
        page1.drawText(`X`, {
          x: 187,
          y: page1.getHeight() - 150,
          size: 8,
          font: helveticaFontBold,
          color: rgb(0, 0, 0.5),
        });
      }

      page1.drawText(registro.evaluador, {
        x: 306,
        y: page1.getHeight() - 150.5,
        size: 6,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.rfc, {
        x: 96,
        y: page1.getHeight() - 168.5,
        size: 6,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.fechaFormateada, {
        x: 260,
        y: page1.getHeight() - 185.5,
        size: 6,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.municipio, {
        x: 64,
        y: page1.getHeight() - 185.5,
        size: 6,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.funcion, {
        x: 60,
        y: page1.getHeight() - 201.5,
        size: 6,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.clavecentro, {
        x: 115,
        y: page1.getHeight() - 221.5,
        size: 7,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.telefonocentro, {
        x: 337,
        y: page1.getHeight() - 220.5,
        size: 6,
        font: helveticaFont,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[0].toString(), {
        x: 495,
        y: page1.getHeight() - 475,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[1].toString(), {
        x: 495,
        y: page1.getHeight() - 491,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[2].toString(), {
        x: 495,
        y: page1.getHeight() - 509,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[3].toString(), {
        x: 495,
        y: page1.getHeight() - 528,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[4].toString(), {
        x: 495,
        y: page1.getHeight() - 546,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[5].toString(), {
        x: 495,
        y: page1.getHeight() - 561,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[6].toString(), {
        x: 495,
        y: page1.getHeight() - 577,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[7].toString(), {
        x: 495,
        y: page1.getHeight() - 593,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[8].toString(), {
        x: 495,
        y: page1.getHeight() - 609,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.puntajeComp[9].toString(), {
        x: 495,
        y: page1.getHeight() - 631,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      page1.drawText(registro.sumaPuntaje.toString(), {
        x: 495,
        y: page1.getHeight() - 652,
        size: 7,
        font: helveticaFontBold,
        color: rgb(1, 0, 0),
      });

      page1.drawText(registro.desempeno.toString(), {
        x: 350,
        y: page1.getHeight() - 673,
        size: 7,
        font: helveticaFontBold,
        color: rgb(1, 0, 0),
      });

      page1.drawText(registro.dias.toString(), {
        x: 380,
        y: page1.getHeight() - 703,
        size: 7,
        font: helveticaFontBold,
        color: rgb(1, 0, 0),
      });

      page1.drawText(registro.multiPuntajeyDias.toString(), {
        x: 350,
        y: page1.getHeight() - 735,
        size: 7,
        font: helveticaFontBold,
        color: rgb(1, 0, 0),
      });

      page2.drawText(registro.antiguedad.toString(), {
        x: 267,
        y: page1.getHeight() - 394,
        size: 7,
        font: helveticaFontBold,
        color: rgb(1, 0, 0),
      });

      page2.drawText(registro.academico.toString(), {
        x: 433,
        y: page1.getHeight() - 356,
        size: 7,
        font: helveticaFontBold,
        color: rgb(1, 0, 0),
      });

      page2.drawText(registro.cursos.toString(), {
        x: 462,
        y: page1.getHeight() - 417,
        size: 7,
        font: helveticaFontBold,
        color: rgb(1, 0, 0),
      });

      page2.drawText(registro.resultadototal.toString(), {
        x: 329,
        y: page1.getHeight() - 448.5,
        size: 9,
        font: helveticaFontBold,
        color: rgb(1, 0, 0),
      });

      page2.drawText(registro.observaciones, {
        x: 119,
        y: page1.getHeight() - 560.5,
        size: 7,
        font: helveticaFontBold,
        color: rgb(0, 0, 0.5),
      });

      const modifiedPdfBytes = await pdfDoc.save();

      // Descargar el archivo PDF para el registro actual
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `FCAPS-3_${registro.nombrepersonal}.pdf`;
      link.click();
    }
  }
}
