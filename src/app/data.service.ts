import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Broker} from './models/Broker';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public refresh=new Subject<void>();
  public ref = new Subject<void>();
  data:any;
  editData:Broker;
  api:string="http://localhost:64435/api/broker";
  constructor(private http:HttpClient) { }
  getStates(){
    return this.http.get("http://localhost:64435/api/activate");
  }
  
  getBrokers(){
    this.data = this.http.get(this.api).pipe(tap(()=>{this.refresh.next();}));
    //console.log(this.data)
    return this.data;
  }
  addBrokers(broker:Broker){
    console.log(broker,"done");
    return this.http.post(this.api,broker);
  }
  updateBroker(id:number,broker:Object){
    return this.http.put(this.api+"/"+id,broker);
  }
  deleteBroker(id:number){
    return this.http.delete(this.api+"/"+id);
  }
  changeStatus(id:number){
    return this.http.put(`http://localhost:64435/api/activate/${id}`,id);
  }
}
