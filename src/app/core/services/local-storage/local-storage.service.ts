import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return localStorage.getItem(key)
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public getItems() {
    let keys = Object.keys(localStorage);
    let items: any[] = [];

    keys.forEach(key => {
      items.push(localStorage.getItem(key))
    })

    return items;    
  }
}
