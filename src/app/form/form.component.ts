  import { Component, OnInit } from '@angular/core';
  import {DataService} from '../data.service';
  import { convertToR3QueryMetadata } from '@angular/core/src/render3/jit/directive';
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
    id;
    name:string="";
    email:string="";
    city:string="";
    state:string="";
    addl1:string="";
    addl2:string="";
    commission:any;
    isActive:string="1";
    appData:any;
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
      this.data.ref.subscribe(()=>{
        this.get();
      })
      this.get();
    }
    
    get(){
      this.data.getData().subscribe(broker=>{ 
        this.appData=broker;
        this.ChartData[0].data[0]=this.appData.active;
        this.ChartData[0].data[1]=this.appData.inactive;
       // console.log( typeof this.active)
      });
    }
    
    regex:RegExp= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    onSubmit(e:Event ):string{
      console.log(e)
      if (this.alpha.test(this.name)==false || this.name.trim().length <3 || this.name.trim().length>100 ) {
        e.preventDefault();
        return this.error="Name cannot be less than 3 and greater than 100 or a number";
      }
      else if(!this.regex.test(this.email)){
        e.preventDefault();
        return this.error="Email is invalid";
      }
      else if(this.alpha.test(this.city)==false || this.city.trim().length <3 || this.city.trim().length>100 ) {
        e.preventDefault();
        return this.error="Enter a valid city name with length between 3 and 100 characters";
      }
      else if(this.state=="none" || this.state=='') {
        e.preventDefault();
        return this.error="Enter a valid state name with length between 3 and 100 characters";
      }
      else if(this.addl1.trim().length <10 || this.addl1.trim().length>100 ) {
        e.preventDefault();
        return this.error="Min length 10 and Max length 100 ";

      }else if(this.addl2.trim().length>100 ) {
        e.preventDefault();
        return this.error="Max length 100 ";

      }else if(this.num.test(this.commission)==false){
        e.preventDefault();
        return this.error="Invalid Value";
      }
      let newBroker:object={name:this.name,email:this.email,city:this.city,state:this.state,address1:this.addl1,address2:this.addl2,commission:this.commission,isActive:Number(this.isActive)}
      this.data.addBrokers(newBroker).subscribe((message)=>{console.log(message);
      });
      event.preventDefault();
      return this.error = "success";
    }

    // update
    onUpdate(e:Event ):string{
      
      if (this.alpha.test(name)==false || this.name.trim().length <3 || this.name.trim().length>100 ) {
        e.preventDefault();
        return this.error="Name cannot be less than 3 and greater than 100 or a number";
      }
      else if(!this.regex.test(this.email)){
        e.preventDefault();
        return this.error="Email is invalid";
      }
      else if(this.alpha.test(this.city)==false || this.city.trim().length <3 || this.city.trim().length>100 ) {
        e.preventDefault();
        return this.error="Enter a valid city name with length between 3 and 100 characters";
      }
      else if(this.state=="none" || this.state=='') {
        e.preventDefault();
        return this.error="Enter a valid state name with length between 3 and 100 characters";
      }
      else if(this.addl1.trim().length <10 || this.addl1.trim().length>100 ) {
        e.preventDefault();
        return this.error="Min length 10 and Max length 100 ";

      }else if(this.addl2.trim().length>100 ) {
        e.preventDefault();
        return this.error="Max length 100 ";

      }else if(this.num.test(this.commission)==false){
        e.preventDefault();
        return this.error="Invalid Value";
      }
      let newBroker:object={id:this.id,name:this.name,email:this.email,city:this.city,state:this.state,address1:this.addl1,address2:this.addl2,commission:this.commission,isActive:Number(this.isActive)}
      this.data.updateBroker(this.id,newBroker).subscribe(message=>{
      });
      event.preventDefault();
      return this.error = "success";
    }

    recieve($event){
      console.log($event);
      this.id=$event.id;
      this.name=$event.name;
      this.email=$event.email;
      this.city=$event.city;
      this.state=$event.state;
      this.addl1=$event.address1;
      this.addl2=$event.address2;
      this.commission=$event.commission;
      this.isActive=$event.isActive;
      this.length= JSON.stringify($event).length;
    
    }
    reset(e){
      this.error=null;
      this.length=0;
      //this.editData=null;
     // window.location.reload();
    }
    ChartOptions={responsive:true}
    ChartLabels =  ['Active','Inactive'];
    ChartColor:any = [
      {
          backgroundColor: 'rgba(30, 169, 224, 0.8)'
          
      },
      {
        backgroundColor:'rgba(255,165,0,0.9)'
      }
  ];

  ChartData:any = [
    { 
        data: []
    }
];
  }
