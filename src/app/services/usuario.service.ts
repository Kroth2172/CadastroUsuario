import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // URL para carregar todos os usuarios cadastrados
  urlListarTodos = 'http://localhost:8080/usuario/listar';
  // URL post
  url = 'http://localhost:8080/usuario/salvar';

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Lista de todos os usuarios
  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlListarTodos)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Cadastrar um novo Usuario
  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  // Tratamento de erro
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client
      errorMessage = error.error.message;
    } else {
      // servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => error);
  };
}
