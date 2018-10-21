import { DIRECTIVES_DATA } from './assets/consts/directives-data';
import { COMPONENTS_DATA } from './assets/consts/components-data';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class DirectivesDataService {
  private _directivesData: { key: DirectiveData };

  constructor(private http: Http) { }

  /**
   * ディレクティブのデータを持つObservableを返す
   *
   */
  public get(): { [key: string]: DirectiveData } {
    return DIRECTIVES_DATA
  }

}


export interface DirectiveData {
  name: string,
  icon: string,
  properties: DirectivePropertyData[]
}

export interface DirectivePropertyData {
  type: string,
  text: string,
  initialValue?: any,
  resultType?: string,     // style, attr, class, none ...
  result?: string
}
