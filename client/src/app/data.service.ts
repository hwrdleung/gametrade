import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  test(){
    console.log('test() from dataservice');
  }

}
