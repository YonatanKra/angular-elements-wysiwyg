import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { ElementWrapperComponent } from './element-wrapper/element-wrapper.component';
import { ElementEditFormComponent } from './element-edit-form/element-edit-form.component';

import { BoxWithTextComponent } from './box-with-text/box-with-text.component';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [ElementWrapperComponent, BoxWithTextComponent, ElementEditFormComponent],
  exports: [ElementWrapperComponent, BoxWithTextComponent],
  entryComponents: [BoxWithTextComponent]
})
export class ElementsModule {

  constructor(private injector: Injector) {
    const boxWithText = createCustomElement(BoxWithTextComponent, {injector});
    customElements.define('box-with-text', boxWithText);
  }
  ngDoBootstrap() {}
}
