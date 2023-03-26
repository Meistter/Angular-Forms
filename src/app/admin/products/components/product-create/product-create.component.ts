import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.module';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {


  form: FormGroup;
  image$: Observable<any>;
  categories: Category[]
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private categoriesServices : CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories()
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      categoryId: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: ['',[Validators.required]],
      description: ['', [Validators.required]],
      stock: [, Validators.required]
    });
    this.form.get('stock').valueChanges.subscribe(value=>{console.log(value)})
    //!Con esto obtenemos los datos desde el otro modulo para aqui en este caso mostrarlos por consola
  }



  get priceField() {
    return this.form.get('price');
  }
  get imagesField(){
    return this.form.get('images')
  }


  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
        const fileList = this.imagesField.value as string[] //!Esto es porque la api nos pide que la imagen llegue en un array
          this.imagesField.setValue([...fileList, url ])
          console.log(url);
         // this.form.get('images').setValue(url);
        });
      })
    )
    .subscribe();
  }

  private getCategories(){
    this.categoriesServices.getAllCategories()
    .subscribe((data)=>{this.categories = data})
  }
}
