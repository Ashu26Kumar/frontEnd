  import { Component, OnInit } from '@angular/core';
  import {DataService} from '../data.service';
  import {Broker} from '../models/Broker';
  @Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
  })
  export class FormComponent implements OnInit {
    error:string ;
    alpha:RegExp=/^[a-zA-Z ]*$/;
    num:RegExp=/^[0-9]\d*(\.\d+)?$/;
    ///editData:object;
    length:number=0;
    stateName:object;
    id:number;
    appData:Broker={
      name:"",
      email:"",
      city:"",
      state:"",
      address1:"",
      address2:"",
      commission:0,
      isActive:1
    };

    active:any=0;
    inactive:any=0;
    constructor(private data:DataService) {
      // this.editData = this.data.editData;
      // console.log(this.editData)
    }
    ngOnInit() {
      this.data.getStates().subscribe(states=>{
        this.stateName =states;
      });
    }
    
    
    
    regex:RegExp= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    onSubmit(e:Event ):string{
      console.log(e)
      if (this.alpha.test(this.appData.name)==false || this.appData.name.trim().length <3 || this.appData.name.trim().length>100 ) {
        e.preventDefault();
        return this.error="Name cannot be less than 3 and greater than 100 or a number";
      }
      else if(!this.regex.test(this.appData.email)){
        e.preventDefault();
        return this.error="Email is invalid";
      }
      else if(this.alpha.test(this.appData.city)==false || this.appData.city.trim().length <3 || this.appData.city.trim().length>100 ) {
        e.preventDefault();
        return this.error="Enter a valid city name with length between 3 and 100 characters";
      }
      else if(this.appData.state=="none" || this.appData.state=='') {
        e.preventDefault();
        return this.error="Enter a valid state name with length between 3 and 100 characters";
      }
      else if(this.appData.address1.trim().length <10 || this.appData.address1.trim().length>100 ) {
        e.preventDefault();
        return this.error="Min length 10 and Max length 100 ";

      }else if(this.appData.address2.length>100 ) {
        e.preventDefault();
        return this.error="Max length 100 ";

      }else if(this.num.test(this.appData.commission)==false){
        e.preventDefault();
        return this.error="Invalid Value";
      }
      this.data.addBrokers(this.appData).subscribe((broker)=>{console.log(broker)});
      event.preventDefault();
      //console.log(this.appData);
      return this.error = "success";
    }

    // update
    onUpdate(e:Event ):string{
      
      if (this.alpha.test(name)==false || this.appData.name.trim().length <3 || this.appData.name.trim().length>100 ) {
        e.preventDefault();
        return this.error="Name cannot be less than 3 and greater than 100 or a number";
      }
      else if(!this.regex.test(this.appData.email)){
        e.preventDefault();
        return this.error="Email is invalid";
      }
      else if(this.alpha.test(this.appData.city)==false || this.appData.city.trim().length <3 || this.appData.city.trim().length>100 ) {
        e.preventDefault();
        return this.error="Enter a valid city name with length between 3 and 100 characters";
      }
      else if(this.appData.state=="none" || this.appData.state=='') {
        e.preventDefault();
        return this.error="Enter a valid state name with length between 3 and 100 characters";
      }
      else if(this.appData.address1.trim().length <10 || this.appData.address1.trim().length>100 ) {
        e.preventDefault();
        return this.error="Min length 10 and Max length 100 ";

      }else if(this.appData.address2.trim().length>100 ) {
        e.preventDefault();
        return this.error="Max length 100 ";

      }else if(this.num.test(this.appData.commission)==false){
        e.preventDefault();
        return this.error="Invalid Value";
      }
      
      this.data.updateBroker(this.id,this.appData).subscribe(message=>{
      });
      event.preventDefault();
       return this.error = "success";
    }

    recieve($event){
      console.log($event);
      this.id=$event.id;
      this.appData.name=$event.name;
      this.appData.email=$event.email;
      this.appData.city=$event.city;
      this.appData.state=$event.state;
      this.appData.address1=$event.address1;
      this.appData.address2=$event.address2;
      this.appData.commission=$event.commission;
      this.appData.isActive=$event.isActive;
      this.error=null;
      this.length= JSON.stringify($event).length;
    
    }
    reset(e){
      this.error=null;
      this.length=0;
      this.appData={
        name:"",
        email:"",
        city:"",
        state:"",
        address1:"",
        address2:"",
        commission:0,
        isActive:1
      };
      //this.editData=null;
     // window.location.reload();
    }
    
  }
