import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MenuModule} from 'primeng/menu';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {CardModule} from 'primeng/card';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ToastModule} from 'primeng/toast';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';





@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    ToolbarModule,
    SplitButtonModule,
    MenuModule,
    ScrollPanelModule,
    CardModule,
    TieredMenuModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    ConfirmPopupModule,
    ToastModule,
    InputTextareaModule,
    TableModule,
    ProgressSpinnerModule
  ]
})
export class PrimengModule { }
