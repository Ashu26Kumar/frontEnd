  import { Component, OnInit,Output } from '@angular/core';
  import {DataService} from "../data.service"
  import { EventEmitter } from '@angular/core';
  @Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
  })
  export class TableComponent implements OnInit {

    @Output() editInfo = new EventEmitter<object>();
    info:object;
    appData:any;
    transfer:Object;
    constructor(private data:DataService) {
      
    
    }
    showData:object;
    view(id:number){
      this.appData.forEach(element => {
        if(element.id == id){
          this.showData = element;
        }
      });
    }
    ngOnInit() {
      this.data.refresh.subscribe(()=>{
        this.getBrokers();
      });
      this.getBrokers();
    }
    getBrokers(){
      this.data.getBrokers().subscribe(broker=>{ 
        this.appData=broker;
        
      });
    }
    Toggle(id:number){
      // console.log(this.data.data[0].isActive);
      // this.appData.forEach(element => {
      //   if(element.id == id){
      //     if(element.isActive ==1){
      //       element.isActive=0;
      //       console.log(element)
      //     }else{
      //       element.isActive =1;
      //       console.log(element);
      //     }
      //   }
      // });
      this.data.changeStatus(id).subscribe(message=>{
        
      })
    }

    //length = this.appData.length;
    pageSize:any = 2;
    pageIndex=0;
    lowValue:Number=0;
    highValue:Number=2;
    //pageSizeOptions: number[] = [5, 10, 25, 100];
    
    getData(event){
     console.log(event)
      this.lowValue = event.pageIndex*event.pageSize;
      this.highValue = this.lowValue+event.pageSize;

      this.pageIndex = event.pageIndex;
    }
    delete(id){
      this.appData.forEach(element => {
        if(element.id == id){
          this.appData.splice(id-1,1);
        }
        });
        this.data.deleteBroker(id).subscribe(message=>{
          });
    }

    edit(id:number){
      this.appData.forEach(element => {
        if(element.id == id){
          this.info = element;
        }
      });
      this.editInfo.emit(this.info);
    }
    
    
  }
