import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import { NgxSpinnerModule } from 'ngx-spinner';

import { CustomBreakPointsProvider } from './custom-breakpoints';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { PipesModule } from './pipes/pipes.module';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule, MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { DropZoneDirective } from './directives/drop-zone.directive';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        NgxSpinnerModule,

        PipesModule,

        MatCardModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatChipsModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatRadioModule,
        MatTabsModule,
        MatExpansionModule,
        MatDialogModule,
        MatProgressBarModule,
        MatRippleModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        NgxSpinnerModule,

        PipesModule,

        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSidenavModule,
        MatSelectModule,
        MatIconModule,
        MatMenuModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatRadioModule,
        MatTooltipModule,
        MatTabsModule,
        MatExpansionModule,
        MatDialogModule,
        MatProgressBarModule,
        MatRippleModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
    ],
    providers: [
      CustomBreakPointsProvider,
      {
        provide: MAT_DATE_LOCALE,
        useValue: 'it-IT'
      },
      { provide: MAT_RADIO_DEFAULT_OPTIONS,
        useValue: {
          color: 'primary'
        }
      },
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: {
          appearance: 'outline'
        }
      }
    ],
    declarations: [
      DropZoneDirective
    ]
})
export class SharedModule {}
