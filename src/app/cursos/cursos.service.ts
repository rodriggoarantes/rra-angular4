import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {

  constructor() { }

  getCursos() {
    let vetor:Array<string> = [];

    vetor.push("Java");
    vetor.push("PHP");
    vetor.push("Javascript");

    return vetor;
  }

}
