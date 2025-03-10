import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { MarkedService } from '../../../../core/services/marked.service';
import { Lesson } from '../../../../core/models/lesson';

@Component({
  selector: 'app-lesson',
  imports: [],
  templateUrl: './lesson.page.html',
  styleUrl: './lesson.page.css',
})
export class LessonPage {
  readonly #markService = inject(MarkedService);

  lesson = input.required<Lesson>();
  mdRef = viewChild.required<ElementRef<HTMLElement>>('md');

  constructor() {
    effect(() => {
      this.#markService.parse(
        this.mdRef().nativeElement,
        this.lesson().content || '',
      );
    });
  }
}
