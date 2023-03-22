import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService} from '../../../../core/services/categories.service'
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'; //nos avisa cuando finaliza la carga de la imagen y nos devuelve una URL final
import { MyValidators } from 'src/app/utils/validators';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form : FormGroup
  carga = null
  categoryId : string
  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService, private router:Router, private storage: AngularFireStorage,
              private route: ActivatedRoute) {
              //con esto capturamos el id de la ruta
 this.buildForm()
  }

  ngOnInit(): void {
  //! Estamos usando este formulario y componente para crear y editar, edita cuando recibimos un id por parametro y si no, entonces el formulario es para crear


    this.route.params.subscribe((params: Params)=>{this.categoryId = params.id})
    //al suscribirnos la variable categoryId siempre estara actualizada con el id ingresado
    if(this.categoryId){
      this.getCategoryId()
    }

  }
  private buildForm(){
    this.form = this.formBuilder.group({  //le enviamos el servicio como parametro a la validacion personalizada
      name: ['',Validators.required, ], //esto deberia llamarse igual al modelado de forma que podamos enviar los datos directos al servicio de creacion
      //Eliminamos la validacion de nombre porq la api no le funciona: MyValidators.validateCategory(this.categoriesService)
      //la validacion de categoria no funciona en la nueva API
      image: ['',Validators.required]
    })
  }
  get nameField(){
    return this.form.get('name')
  }
  get imageField(){
    return this.form.get('image')
  }

  save(){
    console.log('form validation');

    if(this.form.valid){

      if(this.categoryId){
      //   //aqui procesamos
        this.updateCategory()
        console.log('update');

      }else{
        this.createCategory()
        console.log('create');

      }
    }else{
      this.form.markAllAsTouched
    }
  }

  private getCategoryId(){
    this.categoriesService.getCategory(this.categoryId).subscribe(data=>{this.form.patchValue(data); //!esta funcion magica lo que hace es que llena el formulario con los valores respectivos siempre que los valores que le llegan se llamen igual que los del formulario, en este caso obviamente so iguales, entonces llenaremos el formualario de creacion/edicion
    })
  }

  private updateCategory(){

    const data = this.form.value
    this.categoriesService.updateCategory(this.categoryId, data).subscribe(resp =>{this.router.navigate(['./admin/categories'])})
  }

  private createCategory(){
    console.log(this.imageField.value);

    const data = this.form.value
    this.categoriesService.createCategory(data).subscribe(resp =>{this.router.navigate(['./admin/categories'])})
  }
//! Metodo para subida de archivos a firebase

  uploadFile(event){
    //Esta funcion nos permite subir los archivos a firebase
    const image = event.target.files[0];
    const name = `${Math.floor(Math.random() * 9999)}+.png`; //con esto el nombre con el que ser guarda la imagen en el servidor de archivos es con un numero aleatorio maximo 9999
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

       //!Tarea: Implementar barra de carga usando:
       task.percentageChanges().subscribe(rsp=>{this.carga = rsp,console.log(rsp);
       })
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe(url => {
          console.log(url);
          this.imageField.setValue(url);
        });
      })
    )
    .subscribe();


  }



}
