import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment} from '../../../environments/environment'
import { Category } from '../models/category.module';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories(){
    return this.http.get<Category[]>(`${environment.url_api}/categories/`)
  }

  createCategory(data: Partial<Category>){ //el partial nos permite en este caso que el id del modelo no sea obligatorio
    console.log(data);

    return this.http.post<Category>(`${environment.url_api}/categories/`, data)
  }
  updateCategory(id: string, data: Partial<Category>){
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, data)
  }
  checkCategory(name:string){ //aqui comprobamos que el nombre de la categoria no este ocupado
    return this.http.post(`${environment.url_api}/categories/availability`, {name})
  }
}
