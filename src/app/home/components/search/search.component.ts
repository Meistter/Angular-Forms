import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';
import { map, debounceTime } from 'rxjs/operators'

//!Este debounceTime nos permitira dar un tiempo para realizar el query de la busqueda, de forma que no busquemos con cada tecla q se presiona si no que se busque cuando el usuario haga una pausa de un tiempo determinado en su escritura, el tiempo lo determinamos nosotros normalmente 300ms
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField = new FormControl
  constructor(private http: HttpClient) { }

  results: any[]

  ngOnInit(): void {
    this.searchField.valueChanges
    .pipe(debounceTime(500)) //!Aqui definimos el tiempo que debe pasar despues que el usuario hace una pausa en su escritura para que ahora si envie el query
    .subscribe(value =>{
      this.getData(value)
    }) //aqui llamamos a ejecutar la busqueda cada vez q cambie el valor del input ya q le tenemos este observable o suscripcion activa
  }
  private getData(query: string){

    //query representa el valor a buscar
  const token ='fRqE7Z6ywo5g4G7H6cM7nhFsyAka2hJw'
  this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${token}&limit=12`)
  //el pipe con map nos permite formatear lo que estamos recibiendo a gusto, para recibir solo lo que queremos
  .pipe(map((response: any) => {return response.data.map(item => item.images.downsized)}))
                                                                  //aqui le indicamos q nos devolvera es el objeto images dentro del item y dentro de images el downsized solamente
  .subscribe(data=>{console.log(data); this.results=data
  })
}
}
