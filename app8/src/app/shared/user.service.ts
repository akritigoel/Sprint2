import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl="http://localhost:7070/Student/addStudent";
  
  constructor(private http:HttpClient) { }

  public saveUser(user:Object):Observable<any>{
    console.log("inside save student")
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append("Content-Type", "application/json");
    return this.http.post(`${this.baseUrl}/`,user, { headers: httpHeaders });
      
  }
  
  


}
