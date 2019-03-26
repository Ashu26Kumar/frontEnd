import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service"
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  
  appData:any;
  constructor(private data:DataService) {
   
   }

  ngOnInit() {
    this.appData = this.data.data;
    
  }
  Toggle(id){
    // console.log(this.data.data[0].isActive);
    if(this.appData[id-1].isActive == 0){
      this.appData[id-1].isActive =1;
      console.log(this.appData[id-1].isActive);
    }
    else{
      this.appData[id-1].isActive = 0;
      console.log(this.appData[id-1].isActive);
    }
  }

  //length = this.appData.length;
  pageSize = 2;
  pageIndex=0;
  lowValue:Number=0;
  highValue:Number=2;
  //pageSizeOptions: number[] = [5, 10, 25, 100];
  
  getData(event){
   console.log(event);
   
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
  }
}
