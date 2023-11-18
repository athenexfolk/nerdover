import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropComponent } from '../../../../shared/components/backdrop/backdrop.component';
import { Shelf } from '../../../../core/models/shelf';
import { Book } from '../../../../core/models/book';

@Component({
  selector: 'app-confirm-delete-panel',
  standalone: true,
  imports: [CommonModule, BackdropComponent],
  templateUrl: './confirm-delete-panel.component.html',
  styleUrl: './confirm-delete-panel.component.scss',
})
export class ConfirmDeletePanelComponent {
  @Output() closeTrigger = new EventEmitter();
  @Output() confirmTrigger = new EventEmitter();

  close() {
    this.closeTrigger.emit();
  }

  confirmDelete() {
    this.confirmTrigger.emit();
  }
}
