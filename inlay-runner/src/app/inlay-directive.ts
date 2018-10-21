import { DirectiveData, DirectivePropertyData } from "./directives-data.service";
import { InlayComponent } from "./inlay-component";
import { InlayDirectiveProperty } from "./inlay-directive-property";
import { InlayScript } from "./inlay-script";


export class InlayDirective {
    /**
     * このディレクティブのID
     * 
     */
    id: string
    /**
     * ディレクティブ名
     * 
     */
    name: string
    /**
     * ディレクティブを表すアイコン 
     * 
     */
    icon: string
    /**
     * ディレクティブが持つプロパティの一覧
     * 
     */
    private propertiesData: DirectivePropertyData[];
    /**
     * ディレクティブのもつプロパティ一覧。キーはUUID
     * 
     */
    properties:{[key: string]: InlayDirectiveProperty} = {};
    /**
     * このディレクティブの対象となるInlayComponentインスタンス
     * 
     */
    target: InlayComponent

    constructor(public directiveId: string, directiveData: DirectiveData, target: InlayComponent) {
        this.name = directiveData.name
        this.icon = directiveData.icon
        this.target = target
        

        for (const propertyData of directiveData.properties) {
            const property = new InlayDirectiveProperty(propertyData);
            const id = this.getUuid()

            this.properties[id] = property

            let initialValue = propertyData.initialValue
            if (property.resultType == "option" &&  this.target.options[property.result]) {      // optionなら初期値を実際の要素に合わせて変更
                initialValue = this.target.options[property.result]
            }
            this.onPropertyChanged({newVal: initialValue, property: property, id: id})
            
        }


        if (!target.isPreview && directiveId == "custom") {
            const scriptName = directiveData.properties[0].initialValue;
            ( this.target.scriptsManagerService.scripts[scriptName] as InlayScript).runScript()
        }
    }


    onPropertyChanged(data: {newVal: any, property: InlayDirectiveProperty, id: string}) {
        this.properties[data.id].value = data.newVal
        this.target.onPropertyChanged(data.newVal, data.property.resultType, data.property.result)
    }


    private getUuid () {
      // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
      // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
      let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
      for (let i = 0, len = chars.length; i < len; i++) {
          switch (chars[i]) {
              case "x":
                  chars[i] = Math.floor(Math.random() * 16).toString(16);
                  break;
              case "y":
                  chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                  break;
          }
      }
      return chars.join("");
    }


    /**
     * このdirectiveをJson形式に変換
     *
     */
    toJson() {
        let result = {
            name: this.name,
            icon: this.icon,
            properties: {}
        }
        for (let propertyId in this.properties) {
            const property: InlayDirectiveProperty = this.properties[propertyId]
            result.properties[propertyId] = property.toJson()
        }
        return result
    }
}
