import { NgModule } from '@angular/core';
import { DateOrStringPipe } from './date-or-string';

import { ImagesPipe } from './images.pipe';
import { UniquePipe } from './unique';

@NgModule({
  declarations: [ImagesPipe, DateOrStringPipe, UniquePipe],
  exports: [ImagesPipe, DateOrStringPipe, UniquePipe],
})
export class PipesModule {}
