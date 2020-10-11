import { Injectable } from '@angular/core';
import { Cliente } from './clientes/clientes'
import { Clientes } from './clientes/mock-clientes'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  apiURL = 'http://localhost:53479/api'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }  

  constructor(private http: HttpClient) { }

  //get from api

  
  getListaClientes(): Observable<Cliente> {
    return this.http.get<Cliente>(this.apiURL + '/clientes/ObtenerTodos',)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  crearCliente(Cliente): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + '/clientes/Guardar', JSON.stringify(Cliente), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 
  
  actualizarCliente(Cliente): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL + '/clientes/Actualizar', JSON.stringify(Cliente), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getClientexId(idCliente): Observable<Cliente> {

    return this.http.get<Cliente>(this.apiURL + '/clientes/ObtenerxId/' + idCliente)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteEmployee(id) : Observable<boolean>{
    
   
    return this.http.get<boolean>(this.apiURL + '/clientes/Eliminar/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }


}
