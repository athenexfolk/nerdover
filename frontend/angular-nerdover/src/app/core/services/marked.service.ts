import { Injectable } from '@angular/core';
import { Marked } from 'marked';
import renderMathInElement, {
  RenderMathInElementOptions,
} from 'katex/contrib/auto-render';
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

@Injectable({
  providedIn: 'root',
})
export class MarkedService {
  async parse(container: HTMLElement, markdown: string) {
    try {
      const parsedMarkdown = await this.parseMarkdown(markdown);
      container.innerHTML = parsedMarkdown;
      renderMathInElement(container, katexOptions);
    } catch {
      console.log('Error parsing markdown:');
    }
  }

  parseMarkdown(markdown: string) {
    return appMarked.parse(markdown, { async: true, breaks: true });
  }
}
