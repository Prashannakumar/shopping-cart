import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg : string;

  loginForm : FormGroup;

  constructor(public userSer : UsersService, public myRouter : Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'Username' : new FormControl(null, Validators.required),
      'Password' : new FormControl(null, Validators.required)
    });

    $('.toggle').click(()=>{
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
      }, "slow");
    });

  }

  get usernameCtrl() {

    return this.loginForm.get("Username");
  }

  doLogin()
  {

    this.userSer.userLogin(this.loginForm.value).subscribe((data:string)=>{

      console.log(data);

      if(data.length==0)
      {
        this.msg = "Invalid Login";
      }
      else {
        localStorage.setItem("token", data);
        this.myRouter.navigateByUrl("/");
      }
    

     // this.msg =  data;

    }, (error:any)=>{

      console.log(error);

      this.msg = "Something Went Wrong!!";

    });

  }


  doRegister(form:NgForm)
  {
    this.userSer.userRegistration(form.value).subscribe((data:string)=>{

      console.log(data);
      this.msg = data;

      form.reset();

    }, (error:any)=>{

      console.log(error);
      this.msg = "Something went wrong";

    });
  }

}
