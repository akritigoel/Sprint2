import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/Student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../shared/student.service';
import { Question } from '../shared/Question';

@Component({
  selector: 'app-mytest',
  templateUrl: './mytest.component.html',
  styleUrls: ['./mytest.component.css']
})
export class MytestComponent implements OnInit {
    student:Student;
    studentid:number=null;
    allQuestions:Question[];
    testForm:FormGroup;
    rightAnswer=0;
    totalAnswered = 0;
    question:Question;
    chosenAnswer:Question = new Question();

  constructor( private formBuilder: FormBuilder, 
    private route:ActivatedRoute,
    private router: Router,
    private service: StudentService) { }

  ngOnInit() {  
    this.testForm = this.formBuilder.group({
      answer: ['', Validators.required]
    });

    this.student=new Student();
    this.studentid=this.route.snapshot.params['id'];
    this.service.getTestByStudentId(this.studentid)
    .subscribe( res => {
      this.allQuestions = res;
      
    });
  }

  

  submitTest(){
    this.rightAnswer = 0;
		this.totalAnswered = 0;
		for (let i = 0; i < this.allQuestions.length ; i++) {
			if ("chosenAnswer" in this.allQuestions[i] && (this.allQuestions[i]["chosenAnswer"] != null)) {
				this.totalAnswered++;
				if (this.allQuestions[i]["chosenAnswer"] == this.allQuestions[i]["choice"]) {
					this.rightAnswer++;
				}
			}

		}
		
  }

  

}
