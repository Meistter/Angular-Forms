import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validPassword(control: AbstractControl){
    const value = control.value
    if(!containsNumber(value)){
      return {invalid_password: true}
    }
    return null
  }

}

// Estas dos funciones me permiten validar si la contraseña recibida contiene al menos 1 numero
// la primera funcion divide la palabra en un array, donde cada letra es una posicion del array, luego con la
// segunda podemos preguntar si una letra especifica es numero o no
function containsNumber(value: string): boolean {
  return value.split('').some(isNumber);
}

function isNumber(value: string){
  return !isNaN(parseInt(value,10))
}
