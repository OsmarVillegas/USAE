export const validezFormulario = new Array(22).fill(false);

// Esta función muestra los mensajes de error de cada input
export function validaciones() {
  // Validación del rfc 1
  const rfc = document.getElementById('rfc');
  const rfcElement = rfc as HTMLInputElement;
  if (rfcValido(rfcElement.value)) {
    validezFormulario[0] = true;
  } else {
    validezFormulario[0] = false;
  }

  if (rfcElement.value.length > 0) {
    if (rfcElement.value.match(/^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/) !== null) {
      // valor valido
      rfcElement.parentElement
        ?.querySelector('.error')
        ?.classList.toggle('escondido', validezFormulario[0]);

      rfcElement.parentElement
        ?.querySelector('.error2')
        ?.classList.toggle('escondido', validezFormulario[0]);
    } else {
      //error formato
      rfcElement.parentElement
        ?.querySelector('.error2')
        ?.classList.toggle('escondido', false);

      rfcElement.parentElement
        ?.querySelector('.error')
        ?.classList.toggle('escondido', true);
    }
  } else {
    //error longitud
    rfcElement.parentElement
      ?.querySelector('.error2')
      ?.classList.toggle('escondido', true);

    rfcElement.parentElement
      ?.querySelector('.error')
      ?.classList.toggle('escondido', false);
  }

  // Validación del nombre personal 2
  const nomPersonal = document.getElementById('nombrePersonal');
  const nomPersonalElement = nomPersonal as HTMLInputElement;

  validezFormulario[1] = nomPersonalElement.value.length > 0;
  nomPersonalElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[1]);

  // Validación del seccion Sindical 3
  const seccionSindical = document.getElementById('seccionSindical');
  const seccionSindicalElement = seccionSindical as HTMLInputElement;

  validezFormulario[2] = seccionSindicalElement.value != '';
  seccionSindicalElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[2]);

  // Validación del funcion 4
  const funcion = document.getElementById('funcion');
  const funcionElement = funcion as HTMLInputElement;

  validezFormulario[3] = funcionElement.value.length > 0;

  funcionElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[3]);

  // Validación de clavecentro 5
  const claveCentro = document.getElementById('clavecentro');
  const claveCentroElement = claveCentro as HTMLInputElement;
  validezFormulario[4] = claveCentroElement.value != '';
  claveCentroElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[4]);

  // Tipo de centro de trabajo 6
  const tipoCentro = document.getElementById('tipoCentro');
  const tipoCentroElement = tipoCentro as HTMLInputElement;
  validezFormulario[5] = tipoCentroElement.value != '';
  tipoCentroElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[5]);

  // Validación del telefono 7
  const telefono = document.getElementById('telefono');
  const telefonoElement = telefono as HTMLInputElement;

  validezFormulario[6] = telefonoElement.value.match(/^(?:\s?\d{3}){2}\s\d{4}$/) !== null;

  telefonoElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[6]);

  if (telefonoElement.value.length > 0) {
    if (telefonoElement.value.match(/^(?:\s?\d{3}){2}\s\d{4}$/) !== null) {
      // valor valido
      telefonoElement.parentElement
        ?.querySelector('.error')
        ?.classList.toggle('escondido', validezFormulario[6]);

      telefonoElement.parentElement
        ?.querySelector('.error2')
        ?.classList.toggle('escondido', validezFormulario[6]);
    } else {
      //error formato
      telefonoElement.parentElement
        ?.querySelector('.error2')
        ?.classList.toggle('escondido', false);

      telefonoElement.parentElement
        ?.querySelector('.error')
        ?.classList.toggle('escondido', true);
    }
  } else {
    //error longitud
    telefonoElement.parentElement
      ?.querySelector('.error2')
      ?.classList.toggle('escondido', true);

    telefonoElement.parentElement
      ?.querySelector('.error')
      ?.classList.toggle('escondido', false);
  }

  // Validación del nombre Evaluado 8
  const nombreEvaluador = document.getElementById('nombreEvaluador');
  const nombreEvaluadorElement = nombreEvaluador as HTMLInputElement;

  validezFormulario[7] = nombreEvaluadorElement.value != '';
  nombreEvaluadorElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[7]);

  // Validación del dias 9
  const dias = document.getElementById('dias');
  const diasElement = dias as HTMLInputElement;

  validezFormulario[8] = Number(diasElement.value) > 0;
  diasElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[8]);

  /////////////
  /// TABLA ///
  /////////////

  // Validación Desempeño laboral 1
  const puntaje1 = document.getElementById('puntajeComp1');
  const puntaje1Element = puntaje1 as HTMLInputElement;
  validezFormulario[9] = puntaje1Element.value != '';
  puntaje1Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[9]);

  // Validación Desempeño laboral 2
  const puntaje2 = document.getElementById('puntajeComp2');
  const puntaje2Element = puntaje2 as HTMLInputElement;
  validezFormulario[10] = puntaje2Element.value != '';
  puntaje2Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[10]);

  // Validación Desempeño laboral 3
  const puntaje3 = document.getElementById('puntajeComp3');
  const puntaje3Element = puntaje3 as HTMLInputElement;
  validezFormulario[11] = puntaje3Element.value != '';
  puntaje3Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[11]);

  // Validación Desempeño laboral 4
  const puntaje4 = document.getElementById('puntajeComp4');
  const puntaje4Element = puntaje4 as HTMLInputElement;
  validezFormulario[12] = puntaje4Element.value != '';
  puntaje4Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[12]);

  // Validación Desempeño laboral 5
  const puntaje5 = document.getElementById('puntajeComp5');
  const puntaje5Element = puntaje5 as HTMLInputElement;
  validezFormulario[13] = puntaje5Element.value != '';
  puntaje5Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[13]);

  // Validación Desempeño laboral 6
  const puntaje6 = document.getElementById('puntajeComp6');
  const puntaje6Element = puntaje6 as HTMLInputElement;
  validezFormulario[14] = puntaje6Element.value != '';
  puntaje6Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[14]);

  // Validación Desempeño laboral 7
  const puntaje7 = document.getElementById('puntajeComp7');
  const puntaje7Element = puntaje7 as HTMLInputElement;
  validezFormulario[15] = puntaje7Element.value != '';
  puntaje7Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[15]);

  // Validación Desempeño laboral 8
  const puntaje8 = document.getElementById('puntajeComp8');
  const puntaje8Element = puntaje8 as HTMLInputElement;
  validezFormulario[16] = puntaje8Element.value != '';
  puntaje8Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[16]);

  // Validación Desempeño laboral 9
  const puntaje9 = document.getElementById('puntajeComp9');
  const puntaje9Element = puntaje9 as HTMLInputElement;

  validezFormulario[17] = puntaje9Element.value != '';
  puntaje9Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[17]);

  // Validación Desempeño laboral 10
  const puntaje10 = document.getElementById('puntajeComp10');
  const puntaje10Element = puntaje10 as HTMLInputElement;

  validezFormulario[18] = puntaje10Element.value != '';
  puntaje10Element.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[18]);

  /////////////////////////////
  /// INFORMACION ADICIONAL ///
  /////////////////////////////

  // Validación antiguedad
  const antiguedad = document.getElementById('antiguedad');
  const antiguedadElement = antiguedad as HTMLInputElement;

  validezFormulario[19] = antiguedadElement.value != '';
  antiguedadElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[19]);

  // Validación academico
  const academico = document.getElementById('academico');
  const academicoElement = academico as HTMLInputElement;

  validezFormulario[20] = academicoElement.value != '';
  academicoElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[20]);

  // Validación cursos
  const cursos = document.getElementById('cursos');
  const cursoElement = cursos as HTMLInputElement;

  validezFormulario[21] = cursoElement.value != '';
  cursoElement.parentElement
    ?.querySelector('.error')
    ?.classList.toggle('escondido', validezFormulario[21]);
}

// Esta función ayuda a obtener los valores de cada Input, si ya han sido validados regresa true y en el caso contrario false
export function getValues() {
  // Validación del rfc 1
  const rfc = document.getElementById('rfc');
  const rfcElement = rfc as HTMLInputElement;
  if (rfcValido(rfcElement.value)) {
    validezFormulario[0] = true;
  } else {
    validezFormulario[0] = false;
  }

  // Validación del nombre personal 2
  const nomPersonal = document.getElementById('nombrePersonal');
  const nomPersonalElement = nomPersonal as HTMLInputElement;

  validezFormulario[1] = nomPersonalElement.value.length > 0;

  // Validación del seccion Sindical 3
  const seccionSindical = document.getElementById('seccionSindical');
  const seccionSindicalElement = seccionSindical as HTMLInputElement;

  validezFormulario[2] = seccionSindicalElement.value != '';


  // Validación del funcion 4
  const funcion = document.getElementById('funcion');
  const funcionElement = funcion as HTMLInputElement;

  validezFormulario[3] = funcionElement.value.length > 0;


  // Validación de clavecentro 5
  const claveCentro = document.getElementById('clavecentro');
  const claveCentroElement = claveCentro as HTMLInputElement;
  validezFormulario[4] = claveCentroElement.value != '';


  // Tipo de centro de trabajo 6
  const tipoCentro = document.getElementById('tipoCentro');
  const tipoCentroElement = tipoCentro as HTMLInputElement;

  validezFormulario[5] = tipoCentroElement.value != '';


  // Validación del telefono 7
  const telefono = document.getElementById('telefono');
  const telefonoElement = telefono as HTMLInputElement;

  validezFormulario[6] = telefonoElement.value.match(/^(?:\s?\d{3}){2}\s\d{4}$/) !== null;

  // Validación del nombre Evaluado 8
  const nombreEvaluador = document.getElementById('nombreEvaluador');
  const nombreEvaluadorElement = nombreEvaluador as HTMLInputElement;

  validezFormulario[7] = nombreEvaluadorElement.value != '';
 

  // Validación del dias 9
  const dias = document.getElementById('dias');
  const diasElement = dias as HTMLInputElement;

  validezFormulario[8] = Number(diasElement.value) > 0;
  

  /////////////
  /// TABLA ///
  /////////////

  // Validación Desempeño laboral 1
  const puntaje1 = document.getElementById('puntajeComp1');
  const puntaje1Element = puntaje1 as HTMLInputElement;

  validezFormulario[9] = puntaje1Element.value != ''; 

  // Validación Desempeño laboral 2
  const puntaje2 = document.getElementById('puntajeComp2');
  const puntaje2Element = puntaje2 as HTMLInputElement;

  validezFormulario[10] = puntaje2Element.value != '';

  // Validación Desempeño laboral 3
  const puntaje3 = document.getElementById('puntajeComp3');
  const puntaje3Element = puntaje3 as HTMLInputElement;

  validezFormulario[11] = puntaje3Element.value != '';

  // Validación Desempeño laboral 4
  const puntaje4 = document.getElementById('puntajeComp4');
  const puntaje4Element = puntaje4 as HTMLInputElement;

  validezFormulario[12] = puntaje4Element.value != '';

  // Validación Desempeño laboral 5
  const puntaje5 = document.getElementById('puntajeComp5');
  const puntaje5Element = puntaje5 as HTMLInputElement;

  validezFormulario[13] = puntaje5Element.value != '';


  // Validación Desempeño laboral 6
  const puntaje6 = document.getElementById('puntajeComp6');
  const puntaje6Element = puntaje6 as HTMLInputElement;

  validezFormulario[14] = puntaje6Element.value != '';

  // Validación Desempeño laboral 7
  const puntaje7 = document.getElementById('puntajeComp7');
  const puntaje7Element = puntaje7 as HTMLInputElement;

  validezFormulario[15] = puntaje7Element.value != '';

  // Validación Desempeño laboral 8
  const puntaje8 = document.getElementById('puntajeComp8');
  const puntaje8Element = puntaje8 as HTMLInputElement;

  validezFormulario[16] = puntaje8Element.value != '';

  // Validación Desempeño laboral 9
  const puntaje9 = document.getElementById('puntajeComp9');
  const puntaje9Element = puntaje9 as HTMLInputElement;

  validezFormulario[17] = puntaje9Element.value != '';

  // Validación Desempeño laboral 10
  const puntaje10 = document.getElementById('puntajeComp10');
  const puntaje10Element = puntaje10 as HTMLInputElement;

  validezFormulario[18] = puntaje10Element.value != '';


  /////////////////////////////
  /// INFORMACION ADICIONAL ///
  /////////////////////////////

  // Validación antiguedad
  const antiguedad = document.getElementById('antiguedad');
  const antiguedadElement = antiguedad as HTMLInputElement;

  validezFormulario[19] = antiguedadElement.value != '';


  // Validación academico
  const academico = document.getElementById('academico');
  const academicoElement = academico as HTMLInputElement;

  validezFormulario[20] = academicoElement.value != '';


  // Validación cursos
  const cursos = document.getElementById('cursos');
  const cursoElement = cursos as HTMLInputElement;

  validezFormulario[21] = cursoElement.value != '';

}

// Esta función valida que el RFC sea valido
function rfcValido(rfc: string, aceptarGenerico = true) {
  const re =
    /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
  var validado = rfc.match(re);

  if (!validado)
    //Coincide con el formato general del regex?
    return false;

  //Separar el dígito verificador del resto del RFC
  const digitoVerificador = validado.pop(),
    rfcSinDigito = validado.slice(1).join(''),
    len = rfcSinDigito.length,
    //Obtener el digito esperado
    diccionario = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ',
    indice = len + 1;
  var suma, digitoEsperado;

  if (len == 12) suma = 0;
  else suma = 481; //Ajuste para persona moral

  for (var i = 0; i < len; i++)
    suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
  digitoEsperado = 11 - (suma % 11);
  if (digitoEsperado == 11) digitoEsperado = 0;
  else if (digitoEsperado == 10) digitoEsperado = 'A';

  //El dígito verificador coincide con el esperado?
  // o es un RFC Genérico (ventas a público general)?
  if (
    digitoVerificador != digitoEsperado &&
    (!aceptarGenerico || rfcSinDigito + digitoVerificador != 'XAXX010101000')
  )
    return false;
  else if (
    !aceptarGenerico &&
    rfcSinDigito + digitoVerificador == 'XEXX010101000'
  )
    return false;
  return rfcSinDigito + digitoVerificador;
}
