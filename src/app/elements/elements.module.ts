import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { ElementWrapperComponent } from './element-wrapper/element-wrapper.component';
import { ElementEditFormComponent } from './element-edit-form/element-edit-form.component';
import {BoxWithTextModule} from './box-with-text/box-with-text.module';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, BoxWithTextModule
  ],
  declarations: [ElementWrapperComponent, ElementEditFormComponent],
  exports: [ElementWrapperComponent],
  entryComponents: [ElementEditFormComponent]
})
export class ElementsModule {

  constructor(private injector: Injector) {
    const elementEditorForm = createCustomElement(ElementEditFormComponent, {injector});
    customElements.define('element-editor', elementEditorForm);
  }
  ngDoBootstrap() {}
}
