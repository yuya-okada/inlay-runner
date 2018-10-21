import { ScriptsManagerService } from './../scripts-manager.service';
import { ProjectManagerService } from '../project-manager.service';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { InlayComponent } from '../inlay-component';
import { DirectivesDataService } from '../directives-data.service';
import { SceneManagerService } from '../scene-manager.service';


@Component({
  selector: 'app-inlay-button',
  templateUrl: './inlay-button.component.html',
  styleUrls: ['./inlay-button.component.css']
})
export class InlayButtonComponent extends InlayComponent {

  constructor(directivesDataService:DirectivesDataService, elementRef: ElementRef, scriptsManagerService: ScriptsManagerService) {
    super(directivesDataService, elementRef, scriptsManagerService)
  }

}
