import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ElementWrapperComponent} from './element-wrapper/element-wrapper.component';
import { BoxWithTextComponent } from './box-with-text/box-with-text.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ElementWrapperComponent, BoxWithTextComponent],
  exports: [ElementWrapperComponent]
})
export class ElementsModule { }
