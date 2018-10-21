import { ScriptsManagerService } from './scripts-manager.service';
import * as ts from "typescript";
import { ScreenComponent } from './screen/screen.component';
import { Injectable } from '@angular/core';
import { ComponentData, ComponentsDataService } from './components-data.service';
import { Subject } from 'rxjs/Subject';
import { SceneManager, SceneManagerService } from './scene-manager.service';
import { InlayScript } from './inlay-script';
import { InlayComponent } from './inlay-component';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectManagerService {

  public selectedComponentSource = new Subject<{ id: string, component: InlayComponent }>()
  public componentSelectedObservable: Observable<{ id: string, component: InlayComponent }> = this.selectedComponentSource.asObservable();

  /**
   * コンポーネントの設定データ(read only)
   *
   */
  private componentsData: { key?: ComponentData } = {};
  public scenes: { key?: SceneManager } = {}
  public currentSceneName = ""
  public defaultSceneName: string = ""
  public screenComponent: ScreenComponent = null

  /**
   * プレビューモードかどうか
   *
   */
  public isPreview: boolean = false;

  constructor(private componentsDataService: ComponentsDataService, private sceneManagerService: SceneManagerService, private scriptsManagerService: ScriptsManagerService) {

    this.componentsData = this.componentsDataService.get();
  }



  /**
   * プロジェクトを初期化
   *
   */
  initProject(screenComponent: ScreenComponent) {

    this.isPreview = screenComponent.preview

    const projectData = screenComponent.projectData
    this.isPreview = screenComponent.preview
    this.screenComponent = screenComponent
    this.defaultSceneName = projectData.defaultSceneName || Object.keys(projectData.scenes)[0] || ""
    for (let sceneName in projectData.scenes) {
      this.newScene(sceneName)
      if (this.defaultSceneName == sceneName) {
        this.currentSceneName = sceneName
      }
    }

    for (let scriptName in projectData.scripts) {
      const script = projectData.scripts[scriptName]
      this.scriptsManagerService.scripts[scriptName] = new InlayScript(script.xml, script.code)
    }
    this.loadScene(this.defaultSceneName)

  }

  /**
   * 新しい画面を作る
   *
   */
  newScene(name: string): SceneManager {
    let sceneManager = this.sceneManagerService.getInstance(this)
    this.scenes[name] = sceneManager
    return sceneManager
  }

  /**
   * 現在の画面を設定する
   *
   */
  loadScene(name: string): SceneManager {
    this.currentSceneName = name
    const scene = this.scenes[name]
    this.screenComponent.loadScene(name)
    return scene
  }

  /**
   * 現在の画面を返す
   *
   */
  getCurrentScene(): SceneManager {
    return this.scenes[this.currentSceneName]
  }

  /**
   * 現在の画面のコンポーネントを返す
   *
   */
  getCurrentSceneComponent(): ScreenComponent {
    return this.scenes[this.currentSceneName].targetScreenComponent
  }


  /**
   * プロジェクトのデータをJson形式に変換する
   *
   */
  toJson() {
    let result = {
      scenes: {},
      scripts: this.scriptsManagerService.toJson(),
      defaultSceneName: this.defaultSceneName
    }

    // Jsonify scenes
    for (let sceneName in this.scenes) {
      result.scenes[sceneName] = this.scenes[sceneName].toJson()
    }


    return result
  }


}
