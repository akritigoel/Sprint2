import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute,Router,Params } from '@angular/router';
import { Student } from '../shared/Student';
import { StudentService } from '../shared/student.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
  student:Student;
  allStudent: Observable<Student[]>;
  students:Student[];
  studentEditForm : FormGroup;
  submitted= false;
  studentUpdateId:number=null;

  constructor(
    private formBuilder: FormBuilder, 
    private route:ActivatedRoute,
    private router: Router,
    private service: StudentService) { }
   
  ngOnInit() {
    this.student=new Student();
    this.studentUpdateId=this.route.snapshot.params['id'];
    this.service.getStudentById(this.studentUpdateId).subscribe(
      data=>{
        console.log(data);
        this.student=data;
      });

      this.studentEditForm= this.formBuilder.group({
        studentId:["",Validators.required],
        studentName: ["", Validators.required],
        studentPassword: ["", Validators.required]
        
      });
      this.studentEditForm.patchValue({
        studentId : this.student.studentId,
        studentName : this.student.studentName,
        studentPassword : this.student.studentPassword
      })
  }
      onSubmit(){
        
        this.service.update(this.studentEditForm.value,this.student.studentId).subscribe(
          data=>console.log(data),  
          error=>console.log(error)
        );
        this.router.navigate(['list-user']);

        
        
      }

     
    
  }

   
  
  



