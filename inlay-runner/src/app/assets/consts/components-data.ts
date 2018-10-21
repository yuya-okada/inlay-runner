import { ComponentData } from "../../components-data.service";

export const COMPONENTS_DATA: { [key: string]: ComponentData } = {
  "group": {
    "name": "グループ",
    "group": true,
    "icon": "folder",
    "width": 150,
    "height": 150,
    "directives": ["レイアウト", "図形"]
  },
  "listGroup": {
    "name": "リストグループ",
    "group": true,
    "icon": "view_list",
    "width": 150,
    "height": 150,
    "directives": ["レイアウト", "図形"]
  },
  "text": {
    "name": "テキスト",
    "icon": "title",
    "width": 160,
    "height": 60,
    "directives": ["テキスト"]
  },
  "button": {
    "name": "ボタン",
    "icon": "touch_app",
    "width": 120,
    "height": 40,
    "directives": ["button"]
  },
  "icon": {
    "name": "アイコン",
    "icon": "insert_emoticon",
    "unresizable": "xy",
    "directives": ["アイコン"]
  },
  "square": {
    "name": "四角系",
    "icon": "crop_square",
    "width": 150,
    "height": 150,
    "directives": ["図形"]
  },
  "textbox": {
    "name": "入力ボックス",
    "icon": "create",
    "width": 150,
    "unresizable": "y",
    "directives": ["入力"]
  },
  "checkbox": {
    "name": "チェック",
    "icon": "check_box",
    "unresizable": "xy",
    "directives": ["テキスト", "チェック"]
  },
  "switch": {
    "name": "スイッチ",
    "icon": "swap_horizon",
    "unresizable": "xy",
    "directives": ["テキスト", "スイッチ"]
  },
  "slider": {
    "name": "スライダー",
    "icon": "swap_horizon",
    "unresizable": "y",
    "directives": ["スライダー"]
  },
  "image": {
    "name": "画像",
    "icon": "image",
    "width": 100,
    "height": 100,
    "directives": ["画像"]
  }
}
