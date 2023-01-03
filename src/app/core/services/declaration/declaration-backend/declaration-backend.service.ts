import { Injectable } from '@angular/core';
import { Declaration } from 'src/app/core/models/declaration';
import { NewDeclaration } from 'src/app/core/models/new-declaration';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarationBackendService {

  private readonly key = 'userDeclarations';

  constructor(private localStorage: LocalStorageService) { }

  create(newDeclaration: NewDeclaration) {

    let allRecords = this.readAll();
    let id = this.generateId(allRecords);

    let declaration = new Declaration(
      id,
      newDeclaration.period, 
      newDeclaration.from, 
      newDeclaration.to, 
      newDeclaration.generated
    );

    allRecords.push(declaration);
    let json = JSON.stringify(allRecords);
    this.localStorage.saveItem(this.key, json);    
  }

  readAll(): Declaration[] {
    let data = this.localStorage.getItem(this.key);

    if(data === null) 
      return [];

    return JSON.parse(data) as Declaration[];
  }

  clear() {
    this.localStorage.removeItem(this.key);
  }

  private generateId(declarations: Declaration[]): number {
    if(declarations.length === 0) 
      return 1;
    else 
      return declarations[declarations.length - 1].id + 1;
  }
}
