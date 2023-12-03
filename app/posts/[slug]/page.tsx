import React from 'react';
import readMarkdown from '@/lib/readMarkdown';
import NotFound from '@/components/NotFound';
import HighlightCode from '@/components/HighlightCode';
import Markdown from 'react-markdown';
import style from './style.module.css';

const { readContent } = readMarkdown();

export default function Page({ params }: { params: { slug: string } }) {
  const content = readContent(params.slug);
  return content
    ? (
      <div className={style['markdown-wrapper']}>
        <Markdown>
          {content}
        </Markdown>
        <HighlightCode />
      </div>
    )
    : <NotFound />;
}
