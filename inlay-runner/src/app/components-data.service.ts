import { COMPONENTS_DATA } from './assets/consts/components-data';
import { Injectable, Type } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ComponentsDataService {

  private _componentsData: { key: ComponentData };

  constructor(private http: Http) { }

  /**
   * コンポーネントのデータを持つOvserverを返す
   *
   */
  public get(): { [key: string]: ComponentData } {
    return COMPONENTS_DATA

  }
}
export interface ComponentData {
  icon: string,
  name: string,
  group?: boolean,
  width?: number,
  height?: number,
  directives?: string[],
  unresizable?: string // x, y, or xy
}
