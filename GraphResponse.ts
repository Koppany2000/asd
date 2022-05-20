import { Data } from "./Data";


export interface GraphResponse{
    errors:string[];
    data:Data;
    extensions:string;
    dataPresent:boolean;
   
}