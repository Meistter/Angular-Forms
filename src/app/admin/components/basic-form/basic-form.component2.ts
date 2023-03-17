import { Component, OnInit } from '@angular/core';

// Debimos haber importado en el module.ts el ReactiveForms
import { FormControl } from '@angular/forms';
import { Validators, FormGroup } from '@angular/forms'; //esto nos permitira validar los FormControl

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form = new FormGroup({

// !Esta forma es mas rara pero asi manejamos en grupo
  name : new FormControl('',[Validators.required, Validators.maxLength(5)]),
  email : new FormControl('Este es un ejemplo con FormGroup'), //de esta forma podemos declarar los FormControl de forma más ordenada, dentro de un FormGroup
  phone : new FormControl(),
  color : new FormControl(),
  date : new FormControl(),
  age : new FormControl(12), //lo que va entre parentesis es nuestro dato escrito por defecto inicial
  age2 : new FormControl(12),
  category : new FormControl('category-3'), //definimos categoria 3 como valor seleccionado por defecto en la lista
  tag : new FormControl(),
  agree : new FormControl(),//Esto al ser un checkbox se comporta como booleano, cuando esta seleccionado es true y si no, es false
  gender : new FormControl(), //Esto son CheckButtons
  zone : new FormControl(),
  agree2 : new FormControl(),
  })

  // Creamos una variable nameField instanciando un FormControl
//!Esta forma no la usamos mas en el ejercicio pero me parece mas sencilla
//?Si hacemos esto entonces cada Field es independiente y en el html solo llamamos xxField.value
nameField = new FormControl('',[Validators.required, Validators.maxLength(5)])  //usando validators le indicamos que el campo es obligatorio
//podemos tener una serie de validaciones (por ejemplo para que todos los campos de un Formulario esten llenos antes )
// para agregar mas de 1 validacion usamos un array en el 2do parámetro
  emailField = new FormControl()
  phoneField = new FormControl()
  colorField = new FormControl()
  dateField = new FormControl()
  ageField = new FormControl(12) //lo que va entre parentesis es nuestro dato escrito por defecto inicial
  ageField2 = new FormControl(12)
  categoryField = new FormControl('category-3') //definimos categoria 3 como valor seleccionado por defecto en la lista
  tagField = new FormControl()
  agreeField = new FormControl() //Esto al ser un checkbox se comporta como booleano, cuando esta seleccionado es true y si no, es false
  genderField = new FormControl() //Esto son CheckButtons
  zoneField = new FormControl()
  agreeField2 = new FormControl()
  constructor() { }

  ngOnInit(): void {

    // si queremos ver el valor en tiempo real en lugar de usando un boton nos subscribimos a la variable usando la funcion
    // valueChanges
    this.form.get('name').valueChanges.subscribe(value =>{console.log(value);
    })
  }

  getNameValue(){
    // Con esto podremos obtener el valor del Input asociado a nameField
    return this.form.get('name')

  }


  //!Una forma mas simple de trabajar esto es haciendo los nameField y en el html llamamos nameField.value y ya
  getEmail(){
    return this.form.get('email')
  }getPhone(){
    return this.form.get('phone')
  }getColor(){
    return this.form.get('color')
  }getDate(){
    return this.form.get('date')
  }getAge(){
    return this.form.get('age')
  }getAge2(){
    return this.form.get('age2')
  }getCategory(){
    return this.form.get('category')
  }getTag(){
    return this.form.get('tag')
  }getAgree(){
    return this.form.get('agree')
  }getGender(){
    return this.form.get('gender')
  }getZone(){
    return this.form.get('zone')
  }getAgree2(){
    return this.form.get('agree2')
  }


  get isNameFieldValid(){
    return this.nameField.dirty && this.nameField.valid //este metodo lo que nos retorna es un pedazo de codigo que usamos para validar en el html, como lo usamos varias veces entonces lo hacemos un metodo y solo llamamos el metodo allá
  }
  get isNameFieldInValid(){
    return this.nameField.dirty && this.nameField.invalid //este metodo lo que nos retorna es un pedazo de codigo que usamos para validar en el html, como lo usamos varias veces entonces lo hacemos un metodo y solo llamamos el metodo allá
  }

  save(e){
    console.log(this.form.value);


  }
}
