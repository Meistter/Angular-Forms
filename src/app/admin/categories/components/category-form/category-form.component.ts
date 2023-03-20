import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService} from '../../../../core/services/categories.service'
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'; //nos avisa cuando finaliza la carga de la imagen y nos devuelve una URL final
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form : FormGroup
  carga = null
  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService, private router:Router, private storage: AngularFireStorage) {
 this.buildForm()
  }

  ngOnInit(): void {

  }
  private buildForm(){
    this.form = this.formBuilder.group({
      name: ['',Validators.required], //esto deberia llamarse igual al modelado de forma que podamos enviar los datos directos al servicio de creacion
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
      this.createCategory()
    }else{
      this.form.markAllAsTouched
    }
  }

  private createCategory(){
    console.log(this.imageField.value);

    const data = this.form.value
    this.categoriesService.createCategory(data).subscribe(resp =>{console.log(resp),this.router.navigate(['./admin/categories'])})
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
