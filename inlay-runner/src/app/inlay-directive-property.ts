import { DirectivePropertyData } from "./directives-data.service";

export class InlayDirectiveProperty {
    /**
     * プロパティの型 
     * 
     */
    type:string = "";
    /**
     * 結果の出力手法
     * 
     */
    resultType:string = "";
    /**
     * 結果の出力先
     * 
     */
    result:string = "";
    /**
     * プロパティの現在の値を保持
     * 
     */
    value: any = null
    /**
     * プロパティのテキスト
     * 
     */
    text :string = ""

    constructor(propertyData: DirectivePropertyData) {
        this.type = propertyData.type;
        this.resultType = propertyData.resultType;
        this.result = propertyData.result;
        this.value = propertyData.initialValue;
        this.text = propertyData.text;
    }

    toJson() {
        return {
            type: this.type,
            resultType: this.resultType,
            result: this.result,
            value: this.value,
            text: this.text
        }
    }
}
