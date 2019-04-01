import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public refresh=new Subject<void>();
  public ref = new Subject<void>();
  data:any;
  editData:Object;
  api:string="http://localhost:64435/api/broker";
  constructor(private http:HttpClient) { }
  getStates(){
    return this.http.get("http://localhost:64435/api/activate");
  }
  getData(){
    var d = this.http.get("http://localhost:64435/api/values").pipe(tap(()=>{this.ref.next();}));
    
    return d;
  }
  getBrokers(){
    this.data = this.http.get(this.api).pipe(tap(()=>{this.refresh.next();}));
    //console.log(this.data)
    return this.data;
  }
  addBrokers(broker:Object){
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
