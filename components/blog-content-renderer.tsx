"use client";

import React from "react";

interface BlogContentRendererProps {
  content: string;
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const renderContent = () => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim();
        if (text) {
          elements.push(
            <p key={key++} className="mb-4 text-foreground leading-relaxed">
              {renderInlineFormatting(text)}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-2 ml-4 mb-4">
            {listItems.map((item, i) => (
              <li key={i} className="mb-2">
                {renderInlineFormatting(item.replace(/^- /, ''))}
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const renderInlineFormatting = (text: string): React.ReactNode => {
      // Simple and safe: use dangerouslySetInnerHTML since content is from our own blog-data.ts
      const formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/(?<!\*)\*(?!\*)([^*\n]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
      
      return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        flushList();
        flushParagraph();
        elements.push(
          <h1 key={key++} className="text-3xl font-bold mt-8 mb-4">
            {trimmed.replace('# ', '')}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        flushList();
        flushParagraph();
        elements.push(
          <h2 key={key++} className="text-2xl font-bold mt-6 mb-3">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        flushParagraph();
        elements.push(
          <h3 key={key++} className="text-xl font-semibold mt-4 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        flushParagraph();
        inList = true;
        listItems.push(trimmed);
      } else if (trimmed === '') {
        flushList();
        flushParagraph();
      } else {
        if (inList) {
          flushList();
        }
        currentParagraph.push(trimmed);
      }
    });

    flushList();
    flushParagraph();

    return elements;
  };

  return <div className="space-y-4">{renderContent()}</div>;
}
