import { NgModule } from '@angular/core';

import { ImagesPipe } from './images.pipe';

@NgModule({
  declarations: [
    ImagesPipe,
  ],
  exports: [
    ImagesPipe,
  ]
})
export class PipesModule {}
