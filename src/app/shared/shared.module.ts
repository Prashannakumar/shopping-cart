import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestPipe } from '../test.pipe';



@NgModule({
  declarations: [
    TestPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TestPipe,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
