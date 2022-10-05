import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChartModule } from 'primeng/chart'
import { DialogModule } from 'primeng/dialog';


@NgModule({
  exports: [
    BadgeModule,
    RippleModule,
    InputSwitchModule,
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
    ProgressSpinnerModule,
    ChartModule,
    DialogModule,
    DividerModule]
})
export class PrimengModule { }
