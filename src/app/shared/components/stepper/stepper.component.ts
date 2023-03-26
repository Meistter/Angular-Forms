import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }
  ]
})
export class StepperComponent implements OnInit, ControlValueAccessor {
  //! Este controlValueAccesor es necesario para poder entregar valores a los componentes que usen este componente para sus formularios
  currentValue = 50;
  onChange = (_: any) => { }; //!Este metodo nos permite enviar el cambio del valor hacia el componente que lo usa
  onTouch = () => { };
  isDisabled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.currentValue++
    this.onTouch();
    this.onChange(this.currentValue); //!llamamos a la funcion para que mande el cambio
  }

  sub() {
    this.currentValue--
    this.onTouch();
    this.onChange(this.currentValue);
  }
  //! Estos son metodos por defecto del ControlValueAccesor
  writeValue(value: number): void {
    if (value) {
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn; //!Este metodo nos permite enviar el cambio del valor hacia el componente que lo usa
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
