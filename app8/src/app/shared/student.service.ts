import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Student } from './Student';
import { Observable } from 'rxjs';
import { Question } from './Question';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://uplc:7070/Student';

  getStudent(){
     return this.http.get<Student[]>(this.baseUrl + '/' + 'AllStudents');
  }

  deleteStudent(studentId: number) {
    return this.http.delete(this.baseUrl + '/'  + 'deleteStudent' + '/' + studentId ,{responseType:'text'});
  }
  
  getStudentById(studentId: number) {
    return this.http.get<Student>(this.baseUrl + '/' +'findStudentById'+'/' + studentId);
  }

  update(std:Student, studentId):Observable<any> {
    std['studentId'] = studentId
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append("Content-Type", "application/json");
    const url = this.baseUrl + '/' +'updateStudent'
    return this.http.put(url, std,{headers :httpHeaders});
  }

  getTestByStudentId(studentid: number){
    return this.http.get<Question[]>(this.baseUrl+ '/' + 'getTestByStudentId'+'/' + studentid);
  }

  
}
