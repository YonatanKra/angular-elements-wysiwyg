import {Injector, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {createCustomElement} from "@angular/elements";
import {BoxWithTextComponent} from "./box-with-text/box-with-text.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BoxWithTextModule],
  entryComponents: [BoxWithTextModule]
})
export class BoxWithTextModule {
  constructor(private injector: Injector) {
    const boxWithText = createCustomElement(BoxWithTextComponent, {injector});
    customElements.define('box-with-text', boxWithText);
  }
  ngDoBootstrap() {}
}
