import { Component, inject, input, output } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { OverlayCardComponent } from '../../../../shared/components/overlay-card/overlay-card.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { CreateCategoryDto } from '../../../../core/dtos/create-category';

@Component({
  selector: 'app-create-category',
  imports: [OverlayComponent, OverlayCardComponent, ReactiveFormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent {
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    slug: ['', Validators.required],
    name: ['', Validators.required],
  });

  creating = input(false);

  create = output<CreateCategoryDto>();
  closed = output();

  get slug() {
    return this.form.get('slug');
  }

  get name() {
    return this.form.get('name');
  }

  sendRequest() {
    if (this.form.invalid) {
      return;
    }

    this.create.emit({ name: this.name!.value!, slug: this.slug!.value! });
  }
}
