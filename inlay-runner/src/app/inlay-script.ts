import * as ts from "typescript";

export class InlayScript {
    xml: string
    code: string

    constructor(xml:string, code:string) {
        this.xml = xml
        this.code = code
    }

    /**
     * スクリプトの実行
     *
     */
    runScript() {
        // let result: string = ts.transpile(this.code);
        return eval(this.code); 
    }
}
