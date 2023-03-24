import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService} from '../../../../core/services/categories.service'
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'; //nos avisa cuando finaliza la carga de la imagen y nos devuelve una URL final
import { MyValidators } from 'src/app/utils/validators';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/core/models/category.module';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  form : FormGroup
  carga = null


//!Este componente fue refacturado lo que hicimos fue volverlo un dump component, que solo hara acciones sencillas de validacion, mientras que el categorySmart se encargara de procesar los datos
//?Nos comunicamos con el smart component a traves de inputs y outputs
//*Basicamente son padre e hijo
//!el dump component interactua con datos solamente, y el smart component interactua con servicios y procesamientos

@Input() category: Category
@Output() create= new EventEmitter()
@Output() update= new EventEmitter()


  constructor(private formBuilder: FormBuilder, private storage: AngularFireStorage
              ) {
              //con esto capturamos el id de la ruta
 this.buildForm()
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

    if(this.form.valid){

      if(this.category){ //si recibio una categoria entonces actualiza, si no, si la variable category aun es null entonces crea
      //   //aqui procesamos
        this.update.emit(this.form.value) //le notificamos al smart component que debe actualizar


      }else{
        this.create.emit(this.form.value)


      }
    }else{
      this.form.markAllAsTouched
    }
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
