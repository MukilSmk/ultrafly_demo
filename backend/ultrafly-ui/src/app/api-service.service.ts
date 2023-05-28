import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(query:any): Observable<any> {
    let params = new HttpParams();

    // Iterate over the object's key-value pairs and add them as query parameters
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        params = params.set(key, query[key]);
      }
    }
    console.log(params, "params1")

    return this.http.get<any>('http://localhost:7000/api/cars', {params});
  }
  updateNotes(ids:any, body:any): Observable<any> {

    // Iterate over the object's key-value pairs and add them as query parameters
    const params = new HttpParams().set('ids', ids.join(','));


    console.log(params, "params")
    return this.http.post<any>('http://localhost:7000/api/cars/update-notes',body, {params});
  }
}
