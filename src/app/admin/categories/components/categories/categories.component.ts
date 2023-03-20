import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.module';
import { CategoriesService } from 'src/app/core/services/categories.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }
  categorias: Category[] = []

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(resp=>{console.log(resp), this.categorias = resp})
  }

}
