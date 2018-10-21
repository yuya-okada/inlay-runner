import { Injectable } from '@angular/core';
import { InlayScript } from './inlay-script';

@Injectable()
export class ScriptsManagerService {
  

  /**
   * プロジェクトがもつスクリプトの一覧
   *
   */
  scripts: {key?:InlayScript} = {}
  
  constructor() { }


  /**
   * 新しいスクリプトを作成
   * 
   */
  newScripts(scriptName: string) :InlayScript {
    const script = new InlayScript("", "")
    this.scripts[scriptName] = script;
    return script
  }


  /**
   * スクリプトのデータを全てJsonに変換する
   *
   */
  toJson() {
    const result = {}
    // Jsonify scripts
    for (let scriptName in this.scripts) {
      result[scriptName] = {
        code: this.scripts[scriptName].code,
        xml: this.scripts[scriptName].xml
      }
    }

    return result
  }
}
