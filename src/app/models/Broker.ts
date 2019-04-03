export interface Broker{
    name:string,
    email:string,
    city:string,
    state:string,
    address1:string,
    address2:string,
    commission:any,
    isActive:number
}

export interface BrokerWithId{
    id:number,
    name:string,
    email:string,
    city:string,
    state:string,
    addl1:string,
    addl2:string,
    commission:any,
    isActive:string   
}