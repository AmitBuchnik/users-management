import { NgModule } from '@angular/core';

import { MaterialModule } from '../material';

import { DropdownDirective } from './dropdown.directive';
import { SimpleModalComponent } from './simple-modal.component';
import { ModalTriggerDirective } from './modal-trigger.directive';
import { YesNoPipe } from './yesno.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    SimpleModalComponent,
    ModalTriggerDirective,
    YesNoPipe
  ],
  exports: [
    MaterialModule,
    DropdownDirective,
    SimpleModalComponent,
    ModalTriggerDirective,
    YesNoPipe
  ]
})
export class SharedModule { }
