import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../shared/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  viewForm:FormGroup;
  constructor(private router: Router,private route:ActivatedRoute, private service: StudentService, 
    // private alert: MatDialog,
     private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.viewForm= this.formBuilder.group({
      studentid:["",Validators.required],
      
      
    });
  }

  getInputValue(){
    var inputVal = ((document.getElementById("studentid") as HTMLInputElement).value);
           alert(inputVal);
           this.router.navigate(['mytest/'+inputVal])
  }

}
