import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { SessionServiceService } from '../../services/session-service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule,HttpClientModule,RouterOutlet],
  providers:[SignupService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  isFormSubmitted:boolean=false;
  isValidUser: boolean=false;

  constructor(private fb : FormBuilder, private mySer : SignupService,private router : Router, private session : SessionServiceService){

  }


    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    checkUser(){
        if(this.loginForm.valid){
          const{email, password}=this.loginForm.value;
          this.mySer.login(email,password).subscribe(result =>{
            this.isValidUser=result;
          });
        }
        if(!this.isValidUser){
          alert('You are Not Valid User Please SignUp First')
          this.loginForm.reset();
        }
        else{
          const email = this.loginForm.get('email')?.value;
          this.session.setLoggedUser(email);
          alert('Login Successful')
          this.router.navigate(['/createProject']);
        }


      }

    }


