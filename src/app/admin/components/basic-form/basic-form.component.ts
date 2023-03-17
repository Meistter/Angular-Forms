import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// Debimos haber importado en el module.ts el ReactiveForms
import { FormControl } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms'; //esto nos permitira validar los FormControl

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder){
    this.buildForm()
  }

form : FormGroup

private buildForm(){

  this.form = this.formBuilder.group({
    // Ahora practicaremos el manejo de multiples componentes:
    fullName: this.formBuilder.group({ //esto viene a ser entonces otro formGroup
      name : ['',[Validators.required, Validators.maxLength(5),Validators.pattern(/^[a-zA-Z ]+$/)]], //valida una expresion regular
      lastName: ['',[Validators.required, Validators.maxLength(5),Validators.pattern(/^[a-zA-Z ]+$/)]], //valida una expresion regular
    }),
    email : ['',[Validators.required, Validators.email]], //de esta forma podemos declarar los FormControl de forma más ordenada, dentro de un FormGroup
    phone : [,[Validators.required]],
    color : [],
    date : [],
    age : [12, [Validators.min(18), Validators.max(100)]], //lo que va entre parentesis es nuestro dato escrito por defecto inicial
    age2 : [12],
    category : ['category-3'], //definimos categoria 3 como valor seleccionado por defecto en la lista
    tag : [],
    agree : [,[Validators.requiredTrue]],//Esto al ser un checkbox se comporta como booleano, cuando esta seleccionado es true y si no, es false
    gender : [], //Esto son CheckButtons
    zone : [],
    agree2 : [],
  })
}

  ngOnInit(): void {
    // si queremos ver el valor en tiempo real en lugar de usando un boton nos subscribimos a la variable usando la funcion
    // valueChanges
    this.form.get('fullName').get('name').valueChanges.subscribe(value =>{console.log(value);
    })
    // this.form.valueChanges.subscribe(value =>{console.log(value)}) //!esto no escucha 1 elemento especifico si no todo el formulario
  }

  getNameValue(){
    // Con esto podremos obtener el valor del Input asociado a nameField
    // return this.form.get('name') //!Ya no podemos llamarlo asi porq ahora pertenece a un sub form
    return this.form.get('fullName').get('name')
  }

  get isNameFieldValid(){
    return this.nameField.touched && this.nameField.valid //este metodo lo que nos retorna es un pedazo de codigo que usamos para validar en el html, como lo usamos varias veces entonces lo hacemos un metodo y solo llamamos el metodo allá
  }
  get isNameFieldInValid(){
    return this.nameField.touched && this.nameField.invalid //este metodo lo que nos retorna es un pedazo de codigo que usamos para validar en el html, como lo usamos varias veces entonces lo hacemos un metodo y solo llamamos el metodo allá
  }

  save(){
    if(this.form.valid){
      console.log(this.form.value);
    }else{
      console.log('algo anda mal');

      this.form.markAllAsTouched //no funciona
    }
  }

  get nameField() {
    return this.form.get('fullName').get('name') //esta es una forma de obtener el valor de un sub formGroup
  }
  get lastNameField() {
    return this.form.get('fullName.lastName') //esta es la segunda forma
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get ageField() {
    return this.form.get('age');
  }
  get ageField2() {
    return this.form.get('age2');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get agreeField() {
    return this.form.get('agree');
  }
  get agreeField2() {
    return this.form.get('agree2');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get zoneField() {
    return this.form.get('zone');
  }

}
