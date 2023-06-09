import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.module';
import { CategoriesService } from 'src/app/core/services/categories.service';



//Esto es un componente SMART
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

categoryId: string;
category

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private router:Router) { }

  ngOnInit(): void {
    //! Estamos usando este formulario y componente para crear y editar, edita cuando recibimos un id por parametro y si no, entonces el formulario es para crear


      this.route.params.subscribe((params: Params)=>{
        this.categoryId = params.id
        if(this.categoryId){
          this.getCategoryId()
        }
      })
      //al suscribirnos la variable categoryId siempre estara actualizada con el id ingresado


    }

    private getCategoryId(){
      this.categoriesService.getCategory(this.categoryId).subscribe(data=>{this.category = data, console.log(this.category);
      })
    }

    updateCategory(data){
      this.categoriesService.updateCategory(this.categoryId, data).subscribe(resp =>{this.router.navigate(['./admin/categories'])})
    }

    createCategory(data){
      this.categoriesService.createCategory(data).subscribe(resp =>{this.router.navigate(['./admin/categories'])})
    }
}
