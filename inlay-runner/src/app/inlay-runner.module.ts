import { InlayDirective } from './inlay-directive';
import { ComponentsDataService } from './components-data.service';
import { DirectivesDataService } from './directives-data.service';
import { ScreenComponent } from './screen/screen.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { InlayButtonComponent } from './inlay-button/inlay-button.component';
import { ProjectManagerService } from './project-manager.service';
import { SceneManagerService } from './scene-manager.service';
import { HttpModule } from '@angular/http';
import { ScriptsManagerService } from './scripts-manager.service';
import { InlayDirectiveProperty } from './inlay-directive-property';
import { InlayComponent } from './inlay-component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpModule
  ],
  declarations: [
    ScreenComponent,
    InlayButtonComponent
  ],
  providers: [
    ProjectManagerService,
    DirectivesDataService,
    ComponentsDataService,
    SceneManagerService,
    ScriptsManagerService
  ],
  bootstrap: [
    InlayButtonComponent
  ],
  exports: [
    ScreenComponent

  ]
})
export class InlayRunnerModule { }
