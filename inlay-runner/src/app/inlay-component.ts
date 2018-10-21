import { ProjectManagerService } from './project-manager.service';
import { InlayButtonComponent } from "./inlay-button/inlay-button.component";
import { DirectivesDataService, DirectiveData } from "./directives-data.service";
import { InlayDirective } from "./inlay-directive";
import { HostBinding, HostListener, ElementRef, Output, EventEmitter, OnInit, AfterViewInit } from "@angular/core";
import { ScriptsManagerService } from './scripts-manager.service';
declare const $: any;




export class InlayComponent implements OnInit {
    // スタイルを定義するためのプロパティなので、常にtrueにする
    @HostBinding("class.inlay-component") isinlayCompoennt = true
    @HostBinding("class.inlay-component-focused") isFocused = false



    @HostListener("mousedown")
    onMouseDown() {
        this.focus()
    }

    @Output() onFocusEmitter = new EventEmitter(true)

    /**
     * プレビューモードかどうか
     *
     */
    @HostBinding("class.inlay-component-preview") public isPreview: boolean = false;


    /**
     * コンポーネントの要素を表すjQueryオブジェクト
     *
     */
    public $element: any;

    /**
     * コンポーネントの名前
     *
     */
    public name: string = null
    /**
     *
     *
     */
    public type: string = null
    /**
     * コンポーネントのx座標
     *
     */
    public _x = 0
    get x(): number {
        return this._x;
    }
    set x(val: number) {
        this._x = val
        this.$element.css("left", val)
    }

    /**
     * コンポーネントのx座標
     *
     */
    public _y = 0
    get y(): number {
        return this._y;
    }
    set y(val: number) {
        this._y = val
        this.$element.css("top", val)
    }

    /**
     * コンポーネントの高さ
     *
     */
    public _height = 0
    get height(): number {
        return this._height;
    }
    set height(val: number) {
        this._height = val
        this.$element.height(val)
    }

    /**
     * コンポーネントの幅
     *
     */
    public _width = 0
    get width(): number {
        return this._width;
    }
    set width(val: number) {
        this._width = val
        this.$element.width(val)
    }

    /**
     * ディレクティブによって適応されるオプション
     *
     */
    public options: { [key: string]: any } = {}
    /**
     * コンポーネントにアタッチされたディレクティブのリスト
     *
     */
    public directives: InlayDirective[] = []



    public static generate(type: string) {
        switch (type) {
            case "button":
                InlayButtonComponent
                break;
        }
    }

    constructor(
        private directivesDataService: DirectivesDataService,
        private elementRef: ElementRef,
        public scriptsManagerService: ScriptsManagerService,
    ) {
        this.$element = $(elementRef.nativeElement)
    }

    ngOnInit() {
        this.focus()
        if (this.isPreview) {
            this.setDraggable()
            this.setResizable()
        }

    }


    addDirective(directiveNames: string[])
    addDirective(directiveName: string)
    /**
     * 引数に渡された名称をidとするディレクティブをコンポーネントにアタッチする。
     * 配列が渡された場合、各要素それぞれについて上記の処理を行う
     *
     */
    addDirective(arg: any) {
        const directivesData = this.directivesDataService.get()
        if (Array.isArray(arg)) {
            for (const e of arg) {
                this.addDirective(e)
            }
        } else if (typeof arg == "string") {
            const directiveId = arg as string;
            const directive = directivesData[directiveId];
            const inlayDirective = new InlayDirective(directiveId, directive, this);
            this.directives.push(inlayDirective);
        }
    }

    setDirectives(directives: InlayDirective[]) {
        this.directives = directives
    }

    /**
     * カスタムディレクティブを作成し、作成されたInlayDirectiveオブジェクトを返す
     *
     */
    addCustomDirective(): InlayDirective {
        const directiveName = "custom"
        const directiveData: DirectiveData = {
            name: "カスタムディレクティブ",
            icon: "",
            properties: [
                {
                    type: "script",
                    text: "スクリプト",
                    resultType: "script"
                }
            ]
        }

        const inlayDirective = new InlayDirective(directiveName, directiveData, this)
        this.directives.push(inlayDirective)
        return inlayDirective
    }



    /**
     * JSONデータからディレクティブを生成
     *
     */
    addDirectiveFromJson(directiveId: string, directiveData: any) {
        const properties = []
        for (const propertyId in directiveData.properties) {
            const propertyData = directiveData.properties[propertyId]
            properties.push({
                result: propertyData.result,
                resultType: propertyData.resultType,
                text: propertyData.text,
                type: propertyData.type,
                initialValue: propertyData.value,
            })
        }

        const inlayDirective = new InlayDirective(directiveId, {
            name: directiveData.name,
            icon: directiveData.icon,
            properties: properties
        }, this);
        this.directives.push(inlayDirective);
    }
    /**
     * プロパティの値歩変更
     *
     */
    onPropertyChanged(newVal: any, resultType: string, result: any) {
        switch (resultType) {
            case "option":
                this.options[result] = newVal
                break

        }
    }

    /**
     * ドラッグを設定
     *
     */
    setDraggable() {

        let zoomScale: number = 0
        let click = {
            x: 0,
            y: 0
        };

        (this.$element as any).draggable({
            start: (ev: MouseEvent, ui) => {
                const screenRef = this.$element.closest("#screen")
                zoomScale = parseFloat(screenRef.css("transform").split("(")[1].split(")")[0].split(",")[0])
                click.x = ev.clientX
                click.y = ev.clientY
            },
            drag: (ev: MouseEvent, ui) => {
                // const original = ui.originalPosition
                // const x = ( ev.clientX - click.x + original.left) / zoomScale
                // const y = ( ev.clientY - click.y + original.top) / zoomScale

                const x = (ev.clientX - click.x) / zoomScale
                const y = (ev.clientY - click.y) / zoomScale
                ui.position = {
                    left: x,
                    top: y
                }
                this.x = x
                this.y = y
            },
            cancel: null
        })
    }

    setResizable() {
        (this.$element as any).resizable({
            resize: (ev, ui) => {
                this.height = ui.size.height
                this.width = ui.size.width
            }
        })
    }

    /**
     * このコンポーネントをフォーカスされた状態にする
     *
     */
    focus() {
        if (this.isPreview) {
            this.onFocusEmitter.emit()
            this.isFocused = true
        }
    }

    /**
     * このコンポーネントをフォーカスされていない状態にする
     *
     */
    unfocus() {
        this.isFocused = false
    }


    /**
     * このコンポーネントをJson形式に変換
     *
     */
    toJson() {
        let result = {
            type: this.type,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            directives: {}
        }

        for (let key in this.directives) {
            const directive: InlayDirective = this.directives[key]
            result.directives[directive.directiveId] = directive.toJson()
        }

        return result
    }

}
