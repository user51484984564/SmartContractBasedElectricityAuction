import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Declaration } from '../../models/declaration';
import { NewDeclaration } from '../../models/new-declaration';
import { DeclarationBackendService } from './declaration-backend/declaration-backend.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {
  public totalBalance: number = 0;
  private _declarations: BehaviorSubject<Declaration[]> = new BehaviorSubject<Declaration[]>([]);

  get declarations$(): Observable<Declaration[]> {
    return this._declarations.asObservable();
  }

  constructor(private backend: DeclarationBackendService) { }

  create(newDeclaration: NewDeclaration) {
    this.backend.create(newDeclaration);
    this.read();
  }

  read() {
    let declarations = this.backend.readAll();
    this._declarations.next(declarations);
  }

  clear() {
    this.backend.clear();
    this.read();
  }

}
