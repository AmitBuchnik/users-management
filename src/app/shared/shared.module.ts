import { NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';
import { SimpleModalComponent } from './simple-modal.component';
import { ModalTriggerDirective } from './modal-trigger.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  exports: [
    DropdownDirective,
    SimpleModalComponent,
    ModalTriggerDirective
  ]
})
export class SharedModule { }
