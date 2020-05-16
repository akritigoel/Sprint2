import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {NgForm} from '@angular/forms'; 
import {User} from '../shared/user.model';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  addForm: FormGroup;
 
  constructor(private route:ActivatedRoute,private service:UserService,private router:Router , 
    private formBuilder: FormBuilder) { }

  ngOnInit():void {
    this.addForm = this.formBuilder.group({
      studentname: ["",[Validators.required,Validators.minLength(5)]],
      studentpassword: ["", [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]]
      });
     }
     
    
    onSubmit(){
    const myObj = {
    studentName: this.addForm.value.studentname.toString(),
    studentPassword: this.addForm.value.studentpassword.toString()
    };
        const myObjStr = JSON.stringify(myObj);
         this.service.saveUser(myObjStr).subscribe(
          data => {console.log(data);
          alert("successfully registered")
        },
          error =>{ console.log("exception occured");}
        );
    }

  }


