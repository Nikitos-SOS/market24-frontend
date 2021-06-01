import { ProductService } from './../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './../services/login.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user!:User;
  role: string | null;


  constructor(
    private logginService: LoginService,

  ) {
    if(!localStorage.getItem('role')){
      localStorage.setItem('role','');
    }
    this.role=localStorage.getItem('role');

    if(!localStorage.getItem('userId')){
      localStorage.setItem('userId','');
    }
    this.role=localStorage.getItem('userId');


   }

  ngOnInit(): void {
  }

  login(loginForm:NgForm){
    document.getElementById('login-form')?.click();
    this.logginService.loginUser(loginForm.value).subscribe(
      (response: User)=>{
        console.log(response);
        this.user = response
        this.role = this.user.role
        localStorage.setItem('role',this.role);
        localStorage.setItem('userId',String(this.user.id))
        loginForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        loginForm.reset();
      }
    );

    console.log(this.role);
  }

  signin(signinForm:NgForm){
    document.getElementById('signing-form')?.click();
    this.logginService.addUser(signinForm.value).subscribe(
      (response: User) => {
        console.log(response);
        // this.getusers();
        this.user = response;
        this.role = this.user.role;
        signinForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        signinForm.reset();
      }
    );
    localStorage.setItem('role',this.user.role)
  }

  logout(){
    this.role = "";
    localStorage.setItem('role','')
    localStorage.setItem('userId','')
  }

  roleShow(){
    // return this.role;
  }



}
