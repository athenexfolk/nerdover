import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MarkedService } from '../../../../core/services/marked.service';
import { ContentService } from '../../../../core/services/content.service';
import { Lesson } from '../../../../core/models/lesson';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, from, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-lesson',
  imports: [DatePipe],
  templateUrl: './lesson.page.html',
  styleUrl: './lesson.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonPage {
  readonly #markedService = inject(MarkedService);
  readonly #contentService = inject(ContentService);
  readonly #route = inject(ActivatedRoute);

  lesson = signal<Lesson | undefined>(undefined);
  mdRef = viewChild.required<ElementRef<HTMLElement>>('md');
  toc = signal<NodeListOf<HTMLHeadingElement> | undefined>(undefined);

  ngOnInit() {
    this.#route.paramMap
      .pipe(
        switchMap((params) => {
          const categoryId = params.get('categorySlug');
          const lessonId = params.get('lessonSlug');

          if (!categoryId || !lessonId) {
            return EMPTY;
          }

          return this.#contentService.getLessonBySlug(categoryId, lessonId);
        }),
        switchMap((lesson) => {
          this.lesson.set(lesson);
          return from(
            this.#markedService.parse(
              this.mdRef().nativeElement,
              this.lesson()?.content || '',
            ),
          ).pipe(map(() => lesson));
        }),
        tap(() => {
          this.toc.set(this.#markedService.getToC(this.mdRef().nativeElement));
        }),
      )
      .subscribe();
  }

  scrollToElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
