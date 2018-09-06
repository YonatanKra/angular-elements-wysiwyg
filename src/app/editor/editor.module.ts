import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditElementComponent } from './edit-element/edit-element.component';
import {ElementsModule} from '../elements/elements.module';

@NgModule({
  imports: [
    CommonModule,
    ElementsModule
  ],
  declarations: [EditElementComponent],
  exports: [EditElementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditorModule { }
