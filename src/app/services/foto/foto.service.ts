import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foto } from 'src/app/model/foto';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  getFotos(idAlbum: number): Observable<Foto[]> {
    return this.http.get<Foto[]>(`${this.apiUrl}?albumId=${idAlbum}&_limit=10`);
  }
}
