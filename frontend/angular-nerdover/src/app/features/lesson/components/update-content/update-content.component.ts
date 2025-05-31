import {
  Component,
  effect,
  inject,
  input,
  signal,
  viewChild,
  type ElementRef,
} from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Lesson } from '../../../../core/models/lesson';
import { FormsModule } from '@angular/forms';
import * as monaco from 'monaco-editor';
import { MarkedService } from '../../../../core/services/marked.service';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { OverlayCardComponent } from '../../../../shared/components/overlay-card/overlay-card.component';
import { Toggler } from '../../../../shared/utils/toggler';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-content',
  imports: [FormsModule, OverlayComponent, OverlayCardComponent],
  templateUrl: './update-content.component.html',
  styleUrl: './update-content.component.css',
})
export class UpdateContentComponent {
  private readonly apiService = inject(ApiService);
  private readonly markedService = inject(MarkedService);

  id = input.required<string>();

  lesson = signal<Lesson | null | undefined>(undefined);

  editorRef = viewChild.required<ElementRef<HTMLDivElement>>('editor');
  readerRef = viewChild.required<ElementRef<HTMLDivElement>>('reader');

  monacoEditor?: monaco.editor.IStandaloneCodeEditor;

  content = signal('');

  imagePanel = new Toggler();
  savePanel = new Toggler();

  saving = false;
  saveErrorMessage?: string;

  imageUrls: string[] = [];

  constructor() {
    effect(() => {
      this.markedService.parse(this.readerRef().nativeElement, this.content());
    });
  }

  ngOnInit() {
    this.apiService.getLessonById(this.id()).subscribe({
      next: (lesson) => {
        this.lesson.set(lesson);
        this.content.set(lesson.content || '');
        this.monacoEditor = monaco.editor.create(
          this.editorRef().nativeElement,
          {
            value: this.content(),
            language: 'markdown',
            automaticLayout: true,
          },
        );

        this.monacoEditor?.onDidChangeModelContent(() => {
          this.content.set(this.monacoEditor?.getValue() || '');
        });
      },
    });

    this.apiService.getImageLinks().subscribe({
      next: (urls) => (this.imageUrls = urls),
    });
  }

  save() {
    this.saving = true;
    this.saveErrorMessage = undefined;
    this.apiService.updateContent(this.id(), this.content()).subscribe({
      next: () => {
        this.savePanel.deactivate();
        this.saving = false;
        this.saveErrorMessage = undefined;
      },
      error: () => {
        this.saving = false;
        this.saveErrorMessage = 'บันทึกเนื้อหาไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
      },
    });
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.apiService
        .uploadImage(file)
        .pipe(
          finalize(() => {
            input.value = '';
          }),
        )
        .subscribe({
          next: (url) => {
            this.imageUrls.push(url.url);
          },
          error: (err) => {
            console.error('Image upload failed', err);
          },
        });
    }
  }

  copyUrl(url: string) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });
  }
}
