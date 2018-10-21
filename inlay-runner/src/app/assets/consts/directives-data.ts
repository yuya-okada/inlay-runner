import { DirectiveData } from "../../directives-data.service";

export const DIRECTIVES_DATA: { [key: string]: DirectiveData } = {
  "button": {
    "name": "ボタン",
    "icon": "touch_app",
    "properties": [{
      "type": "text",
      "text": "テキスト",
      "initialValue": "ボタン",
      "result": "text",
      "resultType": "option"
    }]
  }
}
