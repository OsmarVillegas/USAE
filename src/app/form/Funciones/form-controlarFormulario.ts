import { ToastrService } from 'ngx-toastr';
import { Renderer2 } from '@angular/core';

export class controlarFormulario {
  constructor(private toastr: ToastrService, private renderer: Renderer2) {}

  // Si el localStorage cuenta con un dato bloquea los inputs y solo deja accesible los necesarios para no tener información redundante.
  BloqueoInteligente(registros: any[]): boolean {
    // Variable para validar
    var activado: Boolean = false;

    // Condicional para desactiviar inputs y selects
    if (registros.length >= 1) {
      return (activado = true);
    } else {
      return (activado = false);
    }
  }

  // Ayuda a ajustar al usuario en el inicio del formulario
  posicionarEditarFormulario(): void {
    // Dirigir al usuario al inicio del formulario y cerrar el modal
    window.scrollTo({ top: 180, behavior: 'smooth' });

    // Mostrar notificación que notifica la edición
    this.toastr.info(
      'El formulario se ha llenado con la información seleccionada',
      'Información lista para editarse',
      {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
      }
    );
  }

  // Formato 000 000 0000 para el input telefono
  formatoTelefono(): void {
    const telefono = document.getElementById('telefono');
    const telefonoElement = telefono as HTMLInputElement;

    telefonoElement.addEventListener('keyup', (e) => {
      let telefonoVal = telefonoElement.value.trim();

      telefonoElement.value = telefonoVal
        .replace(/\W/gi, '')
        .replace(/(.{3})(.{3})/, '$1 $2')
        .replace(/(.{4})$/, ' $1')
        .replace(/\s$/, '');
    });
  }
}
