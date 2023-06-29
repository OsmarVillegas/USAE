export interface Formulario {
    id:number,
    etapa: string;
    nombrepersonal: string;
    seccionsindical: number;
    tipoCentro: string;
    centrotrabajo: string;
    evaluador: string;
    rfc: string;
    inicioperiodo: string;
    finperiodo: string;
    periodoevaluado: string;
    municipio: string;
    funcion: string;
    clavecentro: string;
    telefonocentro: string;
    dias: number;
    observaciones: string;
    cursos: number;
    resultadoTotal: number;
    nuevo: Boolean,
    notificacionNuevo: Boolean,
    multiPuntajeyDias: number,
  
    puntajeComp: number[];
}