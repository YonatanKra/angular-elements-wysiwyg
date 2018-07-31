import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ElementWrapperComponent} from './element-wrapper/element-wrapper.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ElementWrapperComponent],
  exports: [ElementWrapperComponent]
})
export class ElementsModule { }
