import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Esta importacion es la que nos permite trabajar con Formularios, es importante importarla
// En cada modulo
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { MaterialModule } from './../material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';


@NgModule({
  declarations: [ NavComponent, BasicFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AdminModule { }
