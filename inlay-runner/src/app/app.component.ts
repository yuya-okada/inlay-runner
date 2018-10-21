import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { ScreenComponent } from './screen/screen.component';
declare const $: any;

@Component({
    selector: 'app-root',

    templateUrl: './app.component.html',

    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild(ScreenComponent) screenComponent: ScreenComponent

    projectData = {
        "scenes": {
            "メインシーン": {
                "9fccd32e-7fc0-4730-9369-9f3cb60d3d68": {
                    "type": "button",
                    "x": 231.47037678526874,
                    "y": 260.7675057040311,
                    "width": 120,
                    "height": 40,
                    "directives": {
                        "button": {
                            "name": "ボタン",
                            "icon": "touch_app",
                            "properties": {
                                "cf7b3f94-2082-40e5-b920-01b7f6114d7e": {
                                    "type": "text",
                                    "resultType": "option",
                                    "result": "text",
                                    "value": "ボタンaaaaa",
                                    "text": "テキスト"
                                }
                            }
                        },
                        "custom": {
                            "name": "カスタムディレクティブ",
                            "icon": "",
                            "properties": {
                                "8d6377e3-a926-4aac-a39f-8d7fc3c21b4d": {
                                    "type": "script",
                                    "resultType": "script",
                                    "value": "aaaa",
                                    "text": "スクリプト"
                                }
                            }
                        }
                    }
                }
            }
        },
        "scripts": {
            "aaaa": {
                "code": "console.log('hello');\n",
                "xml": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"text\" id=\"[N}h+;D!TNHkz~u`=a?9\" x=\"54\" y=\"80\"><field name=\"TEXT\">1111111111</field></block></xml>"
            }
        },
        "defaultSceneName": "メインシーン"
    }

    ngOnInit() {

        $(() => {
            $(window).on("resize", () => {
                this.screenComponent.resize()
            })

            this.screenComponent.resize()
        })
        this.screenComponent.loadScene("メインシーン")
    }
}
