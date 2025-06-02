import {
  Component,
  inject,
  signal,
  viewChild,
  type ElementRef,
} from '@angular/core';
import { MarkedService } from '../../../core/services/marked.service';
import { ContentService } from '../../../core/services/content.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, from, map, switchMap, tap } from 'rxjs';
import { Lesson as LessonModel } from '../../../core/models/lesson';

@Component({
  selector: 'app-lesson',
  imports: [],
  templateUrl: './lesson.html',
  styleUrl: './lesson.css',
})
export class Lesson {
  private readonly markedService = inject(MarkedService);
  private readonly contentService = inject(ContentService);
  private readonly route = inject(ActivatedRoute);

  lesson = signal<LessonModel | undefined>(undefined);
  mdRef = viewChild.required<ElementRef<HTMLElement>>('md');
  toc = signal<NodeListOf<HTMLHeadingElement> | undefined>(undefined);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const categoryId = params.get('categorySlug');
          const lessonId = params.get('lessonSlug');

          if (!categoryId || !lessonId) {
            return EMPTY;
          }

          return this.contentService.getLessonBySlug(categoryId, lessonId);
        }),
        switchMap((lesson) => {
          this.lesson.set(lesson);
          return from(
            this.markedService.parse(
              this.mdRef().nativeElement,
              this.lesson()?.content || '',
            ),
          ).pipe(map(() => lesson));
        }),
        tap(() => {
          this.toc.set(this.markedService.getToC(this.mdRef().nativeElement));
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
