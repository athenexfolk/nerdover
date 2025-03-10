import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Marked } from 'marked';
import renderMathInElement, {
  RenderMathInElementOptions,
} from 'katex/contrib/auto-render';
import { isPlatformBrowser } from '@angular/common';
import markedShiki from 'marked-shiki';
import { codeToHtml } from 'shiki';

const appMarked = new Marked();

appMarked.use(
  markedShiki({
    async highlight(code, lang) {
      return await codeToHtml(code, {
        lang,
        themes: { light: 'github-dark', dark: 'github-dark' },
      });
    },
  }),
);

const katexOptions: RenderMathInElementOptions = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
  ],
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

@Injectable({
  providedIn: 'root',
})
export class MarkedService {
  readonly #platform = inject(PLATFORM_ID);

  async parse(container: HTMLElement, markdown: string) {
    if (!isPlatformBrowser(this.#platform)) {
      return;
    }
    const parsedMarkdown = await this.parseMarkdown(markdown);
    container.innerHTML = parsedMarkdown;
    renderMathInElement(container, katexOptions);
    // highlightAllUnder(container);
  }

  parseMarkdown(markdown: string) {
    return appMarked.parse(markdown, { async: true, breaks: true });
  }
}
