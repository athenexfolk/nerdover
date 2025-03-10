import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import { MarkedService } from '../../../../core/services/marked.service';
import { Lesson } from '../../../../core/models/lesson';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lesson',
  imports: [DatePipe],
  templateUrl: './lesson.page.html',
  styleUrl: './lesson.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonPage {
  readonly #markService = inject(MarkedService);

  lesson = input.required<Lesson>();
  mdRef = viewChild.required<ElementRef<HTMLElement>>('md');

  constructor() {
    effect(() => {
      const content = this.lesson().content || '';

      untracked(() => {
        this.#markService.parse(this.mdRef().nativeElement, content);
      });
    });
  }
}
