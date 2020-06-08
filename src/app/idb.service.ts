import {Injectable} from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';


@Injectable({
  providedIn: 'root'
})
export class IdbService {

constructor( private dbService: NgxIndexedDBService ) {
}

getByKey(storeName, key){
   return new Promise( (resolve,reject) => {
	this.dbService.getByKey(storeName, key).then(
    user => {
        console.log(user);
        resolve(user)
    },
    error => {
        console.log(error);
        reject(error)
    })
   })
}

getAll(storeName){
    return new Promise((resolve,reject)=>{
	this.dbService.getAll(storeName).then(
    user => {
        console.log(user);
        resolve(user);
    },
    error => {
        console.log(error);
        reject(error)
    }
);
})
}

getByIndex(storeName, indexName, key){
    return new Promise((resolve,reject)=>{
	this.dbService.getByIndex(storeName, indexName, key).then(
    user => {
        console.log(user);
        resolve(user)
    },
    error => {
        console.log(error);
        reject(error)
    }
   );
});
}

add(storeName, value){
    return new Promise((resolve,reject)=>{
	this.dbService.add(storeName, value).then(
    (user) => {
        resolve(user)
    },
    error => {
        console.log(error);
        reject(error)
    }
  );
})
}
}