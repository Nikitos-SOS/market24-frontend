// import { Authentification } from './../interfaces/authentification';
import { ProductService } from './../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './../services/login.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import { User } from '../interfaces/user';
import { Product } from '../interfaces/product';
import { Authentification } from '../interfaces/authentification';
import { User } from '../interfaces/user';
import jwt_decode from 'jwt-decode';
import { checkRole } from '../functions/checkRole';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // user!:AuthentificationModel;
  // role: string | null;

    user!: User;
    auth!: Authentification;


  constructor(
    private logginService: LoginService,

  ) {
    // if(!localStorage.getItem('role')){
    //   localStorage.setItem('role','');
    // }
    // this.role=localStorage.getItem('role');

    // if(!localStorage.getItem('userId')){
    //   localStorage.setItem('userId','');
    // }
    // this.role=localStorage.getItem('userId');


   }

  ngOnInit(): void {
  }

  login(loginForm:NgForm){
    document.getElementById('login-form')?.click();
    this.logginService.loginUser(loginForm.value).subscribe(
      (response: Authentification)=>{
        console.log(response);
        // this.user = response;
        this.auth = response;
        // this.role = this.user.role
        localStorage.setItem('token',this.auth.jwtToken);
        // localStorage.setItem('userId',String(this.user.id))
        loginForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        loginForm.reset();
      }
    );

    console.log(localStorage.getItem('user'));
  }


  checkRole(){
    return checkRole();
  }

  signup(signinForm:NgForm, successForm:NgForm){
    document.getElementById('signing-form')?.click();
    this.logginService.addUser(signinForm.value).subscribe(
      (response: string) => {
        signinForm.reset();
        // successForm.onReset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        signinForm.reset();
      }
    );
    // localStorage.setItem('role',this.user.role)
  }

  logout(){
    localStorage.setItem('token','');
  }

  roleShow(){
    // return this.role;
  }



}
