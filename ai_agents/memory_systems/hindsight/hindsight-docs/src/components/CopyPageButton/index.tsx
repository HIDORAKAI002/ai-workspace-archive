import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

export default function CopyPageButton(): JSX.Element | null {
  const [copied, setCopied] = useState(false);

  const copyPageAsMarkdown = useCallback(async () => {
    try {
      // Get the page content
      const contentElement = document.querySelector('.markdown');
      if (!contentElement) return;

      // Convert HTML to markdown-like text
      let markdown = '';

      // Add title
      const title = document.querySelector('h1')?.textContent;
      if (title) {
        markdown += `# ${title}\n\n`;
      }

      // Extract text content from the markdown container
      const extractMarkdown = (element: Element): string => {
        let text = '';

        const processNode = (node: Node): string => {
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent || '';
          }

          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            const tagName = el.tagName.toLowerCase();
            const children = Array.from(el.childNodes).map(processNode).join('');

            switch (tagName) {
              case 'h1':
                return `# ${children}\n\n`;
              case 'h2':
                return `## ${children}\n\n`;
              case 'h3':
                return `### ${children}\n\n`;
              case 'h4':
                return `#### ${children}\n\n`;
              case 'h5':
                return `##### ${children}\n\n`;
              case 'h6':
                return `###### ${children}\n\n`;
              case 'p':
                return `${children}\n\n`;
              case 'ul':
                return `${children}\n`;
              case 'ol':
                return `${children}\n`;
              case 'li':
                const parent = el.parentElement;
                const isOrdered = parent?.tagName.toLowerCase() === 'ol';
                if (isOrdered) {
                  const index = Array.from(parent?.children || []).indexOf(el) + 1;
                  return `${index}. ${children}\n`;
                }
                return `- ${children}\n`;
              case 'code':
                const isBlock = el.parentElement?.tagName.toLowerCase() === 'pre';
                if (isBlock) {
                  const lang = el.className.replace('language-', '');
                  return `\`\`\`${lang}\n${children}\n\`\`\`\n\n`;
                }
                return `\`${children}\``;
              case 'pre':
                return children; // Already handled by code block
              case 'blockquote':
                return children.split('\n').map(line => `> ${line}`).join('\n') + '\n\n';
              case 'a':
                const href = el.getAttribute('href') || '';
                return `[${children}](${href})`;
              case 'strong':
              case 'b':
                return `**${children}**`;
              case 'em':
              case 'i':
                return `*${children}*`;
              case 'br':
                return '\n';
              case 'hr':
                return '---\n\n';
              case 'table':
                return `${children}\n`;
              case 'thead':
              case 'tbody':
                return children;
              case 'tr':
                return `${children}|\n`;
              case 'th':
              case 'td':
                return `| ${children} `;
              case 'img':
                const src = el.getAttribute('src') || '';
                const alt = el.getAttribute('alt') || '';
                return `![${alt}](${src})`;
              default:
                return children;
            }
          }

          return '';
        };

        Array.from(element.childNodes).forEach(node => {
          text += processNode(node);
        });

        return text;
      };

      // Skip the title h1 if it's already added
      const contentToCopy = Array.from(contentElement.children)
        .filter(child => !(child.tagName === 'H1' && child.textContent === title))
        .map(child => extractMarkdown(child))
        .join('');

      markdown += contentToCopy;

      // Clean up excessive newlines
      markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

      // Copy to clipboard
      await navigator.clipboard.writeText(markdown);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy page content:', error);
    }
  }, []);

  return (
    <button
      className={`${styles.copyPageButton} ${copied ? styles.copied : ''}`}
      onClick={copyPageAsMarkdown}
      aria-label="Copy page as markdown"
      title="Copy page as markdown"
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
          </svg>
          <span className={styles.buttonText}>Copied!</span>
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"/>
            <path d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
          </svg>
          <span className={styles.buttonText}>Copy page</span>
        </>
      )}
    </button>
  );
}