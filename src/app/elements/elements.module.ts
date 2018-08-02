import {Injector, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ElementWrapperComponent} from './element-wrapper/element-wrapper.component';
import { BoxWithTextComponent } from './box-with-text/box-with-text.component';
import {createCustomElement} from "@angular/elements";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ElementWrapperComponent, BoxWithTextComponent],
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
