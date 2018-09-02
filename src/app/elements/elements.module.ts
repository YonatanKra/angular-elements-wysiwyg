import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoxWithTextModule} from './box-with-text/box-with-text.module';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  imports: [
    CommonModule, BoxWithTextModule, SharedModule
  ],
  declarations: [],
  exports: [SharedModule, BoxWithTextModule],
})
export class ElementsModule {

  constructor() {
  }
  ngDoBootstrap() {}
}
