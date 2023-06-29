export function aniosDeAntiguedad(valorAnios: number): Number {
  const valorParaVerificar = {
    valor_1: 0.13,
    valor_2: 0.26,
    valor_3: 0.39,
    valor_4: 0.59,
    valor_5: 0.79,
    valor_6: 0.99,
    valor_7: 1.19,
    valor_8: 1.39,
    valor_9: 1.59,
    valor_10: 1.99,
    valor_11: 2.39,
    valor_12: 2.79,
    valor_13: 3.19,
    valor_14: 3.59,
    valor_15: 3.99,
    valor_16: 4.39,
    valor_17: 4.79,
    valor_18: 5.19,
    valor_19: 5.59,
    valor_20: 5.99,
    valor_21: 6.49,
    valor_22: 6.99,
    valor_23: 7.49,
    valor_24: 7.99,
    valor_25: 8.49,
    valor_26: 8.99,
    valor_27: 9.49,
    valor_28: 10
  };

  let valorRegreso: Number = 0;
  
  switch (valorAnios) {
    case valorParaVerificar.valor_1:
      valorRegreso = 1;
      break;
    case valorParaVerificar.valor_2:
      valorRegreso = 2;
      break;
    case valorParaVerificar.valor_3:
      valorRegreso = 3;
      break;
    case valorParaVerificar.valor_4:
      valorRegreso = 4;
      break;
    case valorParaVerificar.valor_5:
      valorRegreso = 5;
      break;
    case valorParaVerificar.valor_6:
      valorRegreso = 6;
      break;
    case valorParaVerificar.valor_7:
      valorRegreso = 7;
      break;
    case valorParaVerificar.valor_8:
      valorRegreso = 8;
      break;
    case valorParaVerificar.valor_9:
      valorRegreso = 9;
      break;
    case valorParaVerificar.valor_10:
      valorRegreso = 10;
      break;
    case valorParaVerificar.valor_11:
      valorRegreso = 11;
      break;
    case valorParaVerificar.valor_12:
      valorRegreso = 12;
      break;
    case valorParaVerificar.valor_13:
      valorRegreso = 13;
      break;
    case valorParaVerificar.valor_14:
      valorRegreso = 14;
      break;
    case valorParaVerificar.valor_15:
      valorRegreso = 15;
      break;
    case valorParaVerificar.valor_16:
      valorRegreso = 16;
      break;
    case valorParaVerificar.valor_17:
      valorRegreso = 17;
      break;
    case valorParaVerificar.valor_18:
      valorRegreso = 18;
      break;
    case valorParaVerificar.valor_19:
      valorRegreso = 19;
      break;
    case valorParaVerificar.valor_20:
      valorRegreso = 20;
      break;
    case valorParaVerificar.valor_21:
      valorRegreso = 21;
      break;
    case valorParaVerificar.valor_22:
      valorRegreso = 22;
      break;
    case valorParaVerificar.valor_23:
      valorRegreso = 23;
      break;
    case valorParaVerificar.valor_24:
      valorRegreso = 24;
      break;
    case valorParaVerificar.valor_25:
      valorRegreso = 25;
      break;
    case valorParaVerificar.valor_26:
      valorRegreso = 26;
      break;
    case valorParaVerificar.valor_27:
      valorRegreso = 27;
      break;
    case valorParaVerificar.valor_28:
      valorRegreso = 28;
      break;
  }

  return valorRegreso;
}
