import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }
  error:string ;
  alpha:RegExp=/^[a-zA-Z]*$/;
  num:RegExp=/^[0-9]\d*(\.\d+)?$/;

  regex:RegExp= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  onSubmit(name ,email ,city ,state ,addl1 ,addl2 ,commission,e:Event ):string{
    
    if (this.alpha.test(name)==false || name.length <3 || name.length>100 ) {
      e.preventDefault();
      return this.error="Name cannot be less than 3 and greater than 100 or a number";
    }
    else if(!this.regex.test(email)){
      e.preventDefault();
      return this.error="Email is invalid";
    }
    else if(this.alpha.test(city)==false || city.length <3 || city.length>100 ) {
      e.preventDefault();
      return this.error="Enter a valid city name with length between 3 and 100 characters";
    }
    else if(state=="none") {
      e.preventDefault();
      return this.error="Enter a valid state name with length between 3 and 100 characters";
    }
    else if(addl1.length <10 || addl1.length>100 ) {
      e.preventDefault();
      return this.error="Min length 10 and Max length 100 ";

    }else if(addl2.length>100 ) {
      e.preventDefault();
      return this.error="Max length 100 ";

    }else if(this.num.test(commission)==false){
      e.preventDefault();
      return this.error="Invalid Value";
    }
    return this.error = "success";
  }

  reset(){
    this.error=null;
  }

  ngOnInit() {
  }

}
