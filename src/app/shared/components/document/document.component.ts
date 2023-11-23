import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { KatexPipe } from '../../pipes/katex.pipe';
import { BypassHtmlPipe } from '../../pipes/bypass-html.pipe';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [CommonModule, MarkdownComponent, KatexPipe, BypassHtmlPipe],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent {
  @Input({ required: true }) data = '';
}
