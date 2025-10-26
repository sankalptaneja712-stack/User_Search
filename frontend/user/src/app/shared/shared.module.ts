import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule] // Remove SearchBarComponent from declarations/exports
})
export class SharedModule {}
