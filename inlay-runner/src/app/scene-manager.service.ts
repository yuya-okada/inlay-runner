import { Injectable, Type, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';


import { InlayButtonComponent } from "./inlay-button/inlay-button.component";
import { InlayComponent } from "./inlay-component";
import { ComponentsDataService, ComponentData } from "./components-data.service";
import { Uuid } from './uuid';
import { ProjectManagerService } from './project-manager.service';

@Injectable()
export class SceneManagerService {

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private componentsDataService: ComponentsDataService
  ) { }

  getInstance(projectManagerService: ProjectManagerService) {
    return new SceneManager(this._componentFactoryResolver, this.componentsDataService, projectManagerService)
  }

}




export class SceneManager {

  /**
   * 画面上のコンポーネント一覧
   *
   */
  public components: { [key: string]: InlayComponent } = {}


  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private componentsDataService: ComponentsDataService,
    private projectManagerService: ProjectManagerService
  ) {
  }


  /**
   * 新しいコンポーネントを追加し、追加されたコンポーネントのインスタンスを返す
   *
   */
  addComponent(componentType: string): InlayComponent {
    const uuid = Uuid.generate();
    const componentRef = this.initComponent(uuid, componentType)

    const componentsData = this.componentsDataService.get()
    const componentData = componentsData[componentType];

    // 動的に生成したコンポーネントにパラメータを渡す
    componentRef.instance.width = componentData.width;
    componentRef.instance.height = componentData.height;
    componentRef.instance.addDirective(componentData.directives);
    this.onComponentFocused(uuid);

    return componentRef.instance
  }

  /**
   * シーンがもっているコンポーネントの情報をもとにScreenコンポーネントにDOMを生成しなおす
   *
   */
  restoreComponentsDom() {
    $(".inlay-component").addClass("old-component")
    for (let key in this.components) {
      let component = this.components[key]
      this.restoreComponentDom(key, component);
    }
    $(".old-component").remove()
  }

  private restoreComponentDom(id: string, component: InlayComponent) {
    const newComponentRef = this.initComponent(id, component.type)
    const newInstance = newComponentRef.instance;
    newInstance.x = component.x;
    newInstance.y = component.y;
    newInstance.width = component.width;
    newInstance.height = component.height;
    newInstance.name = component.name;
    newInstance.options = component.options
    newInstance.setDirectives(component.directives);
  }

  private initComponent(id: string, componentType: string): ComponentRef<InlayComponent> {
    const componentRef = this.generateComponentRef(componentType)

    componentRef.instance.onFocusEmitter.subscribe(() => {
      this.onComponentFocused(id)
    });

    (componentRef.instance as InlayComponent).isPreview = this.projectManagerService.isPreview;

    this.components[id] = componentRef.instance;
    return componentRef

  }

  private generateComponentRef(componentType: string): ComponentRef<InlayComponent> {
    let type: Type<InlayComponent> = this.getComponentType(componentType);

    // コンポーネント生成器を初期化
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(type);

    // 動的にコンポーネントを生成
    const componentRef = this.projectManagerService.screenComponent.addComponent(componentFactory, componentType);

    // 名前をつける
    const componentsData = this.componentsDataService.get()
    componentRef.instance.name = componentsData[componentType].name

    return componentRef;
  }

  /**
   * 特定のコンポーネントがフォーカスされたとき
   *
   */
  private onComponentFocused(id: string) {
    const component: InlayComponent = this.components[id]

    for (const i in this.components) {
      if (id != i) {
        const component = this.components[i]
        component.unfocus()
      }
    }
    this.projectManagerService.selectedComponentSource.next({
      id: id,
      component: component
    })

  }

  private getComponentType(componentType: string): Type<InlayComponent> {
    switch (componentType) {
      case "button":
        return InlayButtonComponent
    }
    return
  }

  /**
   * シーンをJSON形式に変換する
   *
   */
  toJson() {
    let result = {}
    for (let componentId in this.components) {
      const component = this.components[componentId]
      result[componentId] = component.toJson();
    }
    return result
  }

  /**
   * Jsonデータをもとにコンポーネントを生成する
   *
   */
  addComponentFromJson(id: string, data: any): InlayComponent {
    const component = this.initComponent(id, data.type)
    component.instance.x = data.x
    component.instance.y = data.y
    component.instance.width = data.width
    component.instance.height = data.height

    for (const directiveId in data.directives) {
      const directiveData = data.directives[directiveId]
      component.instance.addDirectiveFromJson(directiveId, directiveData)
    }
    return component.instance
  }
}
