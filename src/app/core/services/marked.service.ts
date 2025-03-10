import { Injectable } from '@angular/core';
import { Marked } from 'marked';
import renderMathInElement, {
  RenderMathInElementOptions,
} from 'katex/contrib/auto-render';
import { highlightAllUnder } from 'prismjs';

const appMarked = new Marked({
  renderer: {
    code: ({ text, lang }) => {
      if (lang === 'mermaid') {
        return `<div class="mermaid">${text}</div>`;
      }
      const escapeText = escapeHtml(text);
      return `<pre><code class="language-${lang}">${escapeText}</code></pre>`;
    },
  },
});

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
  parse(container: HTMLElement, markdown: string) {
    const parsedMarkdown = this.parseMarkdown(markdown);
    container.innerHTML = parsedMarkdown;
    renderMathInElement(container, katexOptions);
    highlightAllUnder(container);
  }

  parseMarkdown(markdown: string) {
    return appMarked.parse(markdown, { async: false, breaks: true });
  }
}
