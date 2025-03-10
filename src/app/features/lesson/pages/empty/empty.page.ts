import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-empty',
  imports: [],
  templateUrl: './empty.page.html',
  styleUrl: './empty.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyPage {}
