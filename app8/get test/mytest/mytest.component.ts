import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/Student';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-mytest',
  templateUrl: './mytest.component.html',
  styleUrls: ['./mytest.component.css']
})
export class MytestComponent implements OnInit {
    student:Student;
    studentid:number=null;
  constructor( private formBuilder: FormBuilder, 
    private route:ActivatedRoute,
    private router: Router,
    private service: StudentService) { }

  ngOnInit() {
    this.student=new Student();
    this.studentid=this.route.snapshot.params['id'];
    this.service.getTestByStudentId(this.studentid)
    .subscribe( res => {
      this.student = res;
      
    });

     
  }

}
