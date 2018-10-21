import { Component, OnInit, ElementRef, ComponentFactoryResolver, ViewContainerRef, Type, ComponentFactory, ComponentRef, ViewChild, Input, NgZone } from '@angular/core';
import { ProjectManagerService } from '../project-manager.service';
import { ComponentData, ComponentsDataService } from '../components-data.service';
import { InlayComponent } from '../inlay-component';
import { SceneManager } from '../scene-manager.service';
declare const $: any;

@Component({
  selector: 'screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  @Input() projectData: any;

  /**
   * trueならばプレビューモードでの実行
   *
   */
  @Input() preview: boolean = false;

  /**
   * この要素の下に新しいコンポーネントを挿入する
   *
   */
  @ViewChild('componentInsertMarker', { read: ViewContainerRef }) private componentInsertMarkerRef: ViewContainerRef;

  /**
   * ScreenComponentのルート要素
   *
   */
  private element: JQuery;
  /**
   * Screenの描画療育の要素
   *
   */
  private screen: JQuery;

  private componentsData: { [key: string]: ComponentData } = null

  marginLeft: number;
  ratio: number;

  constructor(
    private elementRef: ElementRef,
    private componentsDataService: ComponentsDataService,
    private projectManagerService: ProjectManagerService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.projectManagerService.initProject(this)




    this.componentsData = this.componentsDataService.get()
    // elementとscreenプロパティを初期化
    $(() => {
      this.element = $(this.elementRef.nativeElement).children(".screen-wrapper");
      this.screen = this.element.find("#screen");
      console.log(this.screen)


      $(window).on("resize", () => {
        this.resize()
      })
      this.resize()
    })

  }
  /**
   * 指定したシーンを読み込み、表示する
   *
   */
  loadScene(name: string) {
    const currentScene: SceneManager = this.projectManagerService.scenes[name]

    if (currentScene) {
      // もしシーンが初期化されていないなら
      if (Object.keys(currentScene.components).length == 0) {
        // for (let sceneName in this.projectManagerService.scenes) {
        this.initSceneView(name, currentScene)
        // }

      } else {     // すでに初期化されていれば復元する。
        this.componentInsertMarkerRef.clear()
        currentScene.restoreComponentsDom()
      }
    }
  }

  /**
   * スクリーンのサイズをリサイズする
   *
   */
  resize() {
    this.ngZone.run(() => {

      if (!this.screen) {   // jQueryが初期化されるまでウェイト
        setTimeout(() => this.resize(), 100)
        return
      }
      var height: number = this.screen.height();
      var wrapperHeight: number = this.element.height();
      this.ratio = (wrapperHeight - 50) / height;
      this.marginLeft = (this.element.width() - this.screen.width() * this.ratio) / 2;
    })
  }

  addComponent(componentFactory: ComponentFactory<InlayComponent>, componentType: string): ComponentRef<InlayComponent> {
    console.log(this.componentInsertMarkerRef)
    const componentRef = this.componentInsertMarkerRef.createComponent(componentFactory);
    componentRef.instance.type = componentType

    return componentRef
  }


  /**
   * シーンのプレビューを初期化。
   *
   */
  private initSceneView(sceneName: string, scene: SceneManager) {
    this.componentInsertMarkerRef.clear()
    $(".inlay-component").remove()
    const scenes = this.projectData.scenes[sceneName] || {}
    for (let componentId in scenes) {
      scene.addComponentFromJson(componentId, scenes[componentId])
    }
  }

}
