import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  currentUser;

  constructor() { }

  test(){
    console.log('test() from dataservice');
  }

}
