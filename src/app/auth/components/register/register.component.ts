import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  private buildForm() {
    //Estamos usando el modulo validators, para usar aqui nuestra validacion personalizada
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['',[Validators.required]],
      type: ['company', [Validators.required]], //selecciona por defecto la opcion Company
      companyName: ['',[Validators.required]],
      range1: [],
      range2: []
    },{
      //para validar que las contraseñas sean iguales debemos usar una validacion grupal, porq trata mas de 1 cammpo, eso lo hacemos asi:
      validators: [MyValidators.equalPasswords, MyValidators.range]//!este viene a ser un error de todo el formulario, y que depende de si las contraseñas son iguales o no
    });

    //*Esto es una validacion en tiempo de ejecucion
    //?me subscribo al get del type para mantener control de cada vez que cambie
    this.typeField.valueChanges.subscribe(value => {console.log(value)
      if(value === 'company'){
        this.companyNameField.setValidators([Validators.required])
      }else{
        this.companyNameField.setValidators(null)
      }
      this.companyNameField.updateValueAndValidity()
      //! Con esta funcion asyncrona lo que estamos logrando es establecer validaciones en el radio group solamente cuando la opcion company este seleccionada
    })
  }

  get emailField(){
    return this.form.get('email')
  }
  get passwordField(){
    return this.form.get('password')
  }
  get confirmPasswordField(){
    return this.form.get('confirmPassword')
  }
  get range1Field(){
    return this.form.get('range1')
  }
  get range2Field(){
    return this.form.get('range2')
  }
  get typeField(){
    return this.form.get('type')
  }
  get companyNameField(){
    return this.form.get('companyName')
  }

}
