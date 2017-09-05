import { NgModule } from '@angular/core';
import { DefaultModal } from './default-modal/default-modal.component';

@NgModule({
  imports: [
  ],
  entryComponents: [
    DefaultModal,
  ],
  declarations: [
    DefaultModal,
  ],
  exports: [
    DefaultModal,
  ],
})
export class ModalModule {
}
