import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { EditorElementWrapperComponent } from './editor-element-wrapper/editor-element-wrapper.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CanvasComponent, EditorElementWrapperComponent],
  exports: [CanvasComponent, EditorElementWrapperComponent]
})
export class CanvasModule { }
