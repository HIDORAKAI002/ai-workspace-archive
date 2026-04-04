import React, { useState, useCallback } from 'react';
import styles from './SkillBanner.module.css';

function extractMarkdown(element: Element): string {
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
        case 'h1': return `# ${children}\n\n`;
        case 'h2': return `## ${children}\n\n`;
        case 'h3': return `### ${children}\n\n`;
        case 'h4': return `#### ${children}\n\n`;
        case 'h5': return `##### ${children}\n\n`;
        case 'h6': return `###### ${children}\n\n`;
        case 'p': return `${children}\n\n`;
        case 'ul': return `${children}\n`;
        case 'ol': return `${children}\n`;
        case 'li': {
          const parent = el.parentElement;
          const isOrdered = parent?.tagName.toLowerCase() === 'ol';
          if (isOrdered) {
            const index = Array.from(parent?.children || []).indexOf(el) + 1;
            return `${index}. ${children}\n`;
          }
          return `- ${children}\n`;
        }
        case 'code': {
          const isBlock = el.parentElement?.tagName.toLowerCase() === 'pre';
          if (isBlock) {
            const lang = el.className.replace('language-', '');
            return `\`\`\`${lang}\n${children}\n\`\`\`\n\n`;
          }
          return `\`${children}\``;
        }
        case 'pre': return children;
        case 'blockquote': return children.split('\n').map(line => `> ${line}`).join('\n') + '\n\n';
        case 'a': return `[${children}](${el.getAttribute('href') || ''})`;
        case 'strong': case 'b': return `**${children}**`;
        case 'em': case 'i': return `*${children}*`;
        case 'br': return '\n';
        case 'hr': return '---\n\n';
        case 'table': return `${children}\n`;
        case 'thead': case 'tbody': return children;
        case 'tr': return `${children}|\n`;
        case 'th': case 'td': return `| ${children} `;
        case 'img': return `![${el.getAttribute('alt') || ''}](${el.getAttribute('src') || ''})`;
        default: return children;
      }
    }
    return '';
  };

  Array.from(element.childNodes).forEach(node => { text += processNode(node); });
  return text;
}

export default function SkillBanner(): JSX.Element {
  const [commandCopied, setCommandCopied] = useState(false);
  const [pageCopied, setPageCopied] = useState(false);
  const command = 'npx skills add https://github.com/vectorize-io/hindsight --skill hindsight-docs';

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCommandCopied(true);
      setTimeout(() => setCommandCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyPage = useCallback(async () => {
    try {
      const contentElement = document.querySelector('.markdown');
      if (!contentElement) return;
      const title = document.querySelector('h1')?.textContent;
      let markdown = title ? `# ${title}\n\n` : '';
      const contentToCopy = Array.from(contentElement.children)
        .filter(child => !(child.tagName === 'H1' && child.textContent === title))
        .map(child => extractMarkdown(child))
        .join('');
      markdown += contentToCopy;
      markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();
      await navigator.clipboard.writeText(markdown);
      setPageCopied(true);
      setTimeout(() => setPageCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy page content:', error);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.icon}>🤖</div>
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <div className={styles.title}>
              Using a coding agent? Run this to install the Hindsight docs skill:
            </div>
            <button
              className={`${styles.copyPageButton} ${pageCopied ? styles.copyPageCopied : ''}`}
              onClick={handleCopyPage}
              aria-label="Export page as markdown"
              title={pageCopied ? 'Copied!' : 'Export page as markdown'}
            >
              {pageCopied ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6z"/>
                  <path d="M2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
                </svg>
              )}
              <span>{pageCopied ? 'Copied!' : 'export this page as .md'}</span>
            </button>
          </div>
          <div className={styles.commandWrapper}>
            <code className={styles.command}>{command}</code>
            <button
              className={styles.copyButton}
              onClick={handleCopyCommand}
              aria-label="Copy command"
              title={commandCopied ? 'Copied!' : 'Copy to clipboard'}
            >
              {commandCopied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
