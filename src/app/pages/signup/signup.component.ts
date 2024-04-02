import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule,HttpClientModule],
  providers:[SignupService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
      
    userForm!:FormGroup;
      isFormSubmitted:boolean = false;

      constructor(private fb : FormBuilder,private mySer : SignupService){

      }
    ngOnInit(): void {
      this.userForm = this.fb.group({
        name: ['', [Validators.required]],
        contact: ['', [Validators.required, Validators.minLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        address: ['', Validators.required]
      });
    }

    onSumbit(){
      let ur=this.userForm.value;
      if(!this.isFormSubmitted && this.userForm.valid){
       this.mySer.saveUser(ur).subscribe(result=>{
        alert('User Saved Successfully')
        console.log(ur);
        this.userForm.reset();
        this.isFormSubmitted=false;
       });
      }
    }

}
