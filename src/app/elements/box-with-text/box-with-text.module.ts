import {Injector, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {createCustomElement} from '@angular/elements';
import {BoxWithTextComponent} from './box-with-text/box-with-text.component';
import { BoxWithTextEditorComponent } from './box-with-text-editor/box-with-text-editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BoxWithTextComponent, BoxWithTextEditorComponent],
  entryComponents: [BoxWithTextComponent]
})
export class BoxWithTextModule {
  constructor(private injector: Injector) {
    const theElement = createCustomElement(BoxWithTextComponent, {injector});
    customElements.define('box-with-text', theElement);

    const theEditor = createCustomElement(BoxWithTextEditorComponent, {injector});
    customElements.define('box-with-text-editor', theEditor);
  }
  ngDoBootstrap() {}
}
