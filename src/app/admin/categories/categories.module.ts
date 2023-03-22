import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material/material.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CategoryComponent } from './container/category/category.component';

@NgModule({
  declarations: [CategoriesComponent, CategoryFormComponent, CategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CategoriesRoutingModule,
    MatProgressBarModule
    // AngularFireStorage
  ]
})
export class CategoriesModule { }
