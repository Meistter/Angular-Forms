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

  static equalPasswords(control: AbstractControl){
    const password = control.get('password').value //aqui estamos opteniendo todo el formulario en control, entonces seleccionamos a password especificamente
    const confirmPassword = control.get('confirmPassword').value

    if(password === confirmPassword){
      return null //retornar nulo significa q no hay error
    }
    return {match_password: true} //este match_password es lo q usaremos para validar del otro lado

  }
  static range(control: AbstractControl){
    const range1 = control.get('range1').value
    const range2 = control.get('range2').value

    if(range1 < range2 && range1 < 100 && range2 <= 100){
      return null
    }
    return {range_right: true}
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
