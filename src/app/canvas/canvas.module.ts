import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import {ElementsModule} from '../elements/elements.module';

@NgModule({
  imports: [
    CommonModule,
    ElementsModule
  ],
  declarations: [CanvasComponent],
  exports: [CanvasComponent]
})
export class CanvasModule { }
