import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ElementEditFormComponent} from '../element-edit-form/element-edit-form.component';
import {ElementWrapperComponent} from '../element-wrapper/element-wrapper.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [ElementWrapperComponent, ElementEditFormComponent],
  exports: [ElementWrapperComponent, ElementEditFormComponent]
})
export class SharedModule { }
