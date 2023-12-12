import React from 'react';
import Image from 'next/image';
import readMarkdown from '@/lib/readMarkdown';
import NotFound from '@/components/server/NotFound';
import HighlightCode from '@/components/client/HighlightCode';
import Markdown from 'react-markdown';
import style from './style.module.css';

const { readContent } = readMarkdown();

export default function Page({ params }: { params: { slug: string } }) {
  const { data, content } = readContent(params.slug) ?? { data: null, content: '' };
  console.log(data?.title);

  return content
    ? (
      <div className={style['markdown-wrapper']}>
        <h1>{data?.title}</h1>
        <div
          className={style['cover-image']}
        >
          <Image
            src={data?.coverImage ?? ''}
            fill
            alt="coverImage"
          />
        </div>
        <Markdown>
          {content}
        </Markdown>
        <HighlightCode />
      </div>
    )
    : <NotFound />;
}
